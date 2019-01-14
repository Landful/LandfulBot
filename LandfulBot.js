const { Client, Collection, MessageEmbed } = require('discord.js')
const Fs = require('fs')

class LandfulBot extends Client {
    constructor (options = {}) {
        super(options)
        
        this.prefixes = [process.env.PREFIX]
        this.mentionPrefix = true
        this.commands = new Collection()

        this.initCommands('./commands')
        this.initListeners('./events')
        this.initSubCommands('./subcommands')
    }

    initCommands (path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(commandName, this)
                        return this.commands.set(commandName, command)
                    } else if (Fs.lstatSync(filePath).isDirectory()) {
                        this.initCommands(filePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
    }
    
    initSubCommands (path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(commandName, this)
                        return this.commands.get(path.split('/').pop()).subcommands.push(command)
                    } else if (Fs.lstatSync(filePath).isDirectory()) {
                        this.initSubCommands(filePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
    }
    
    initListeners (path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        let Listener = require(filePath)
                        this.on(file.replace(/.js/g, ''), Listener)
                    }

                    let stats = Fs.lstatSync(filePath)
                    if (stats.isDirectory()) {
                        this.initListeners(filePath)
                    }            
                } catch (error) {
                    console.error(error)
                }
            })
    }

    sendLoggerError (error) {
        console.log(error)
        let embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(error.name)
            .setAuthor(this.user.username, this.user.displayAvatarURL())
            .addDescription(error.message)
            .addField('Arquivo', `${error.fileName} ${error.lineNumber}`)
        return this.channels.get(process.env.LOG_ERROR).send(embed)
    }
}

module.exports = LandfulBot
