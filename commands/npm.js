const { Command, Constants } = require('../utils')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const ApiNpm = require('api-npm')

class Npm extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
    }

    async run (msg, args) {
        let query = args.join(' ')

        msg.channel.startTyping()
        ApiNpm.getdetails(query, (data) => {
            if (!data)
                return msg.channel.send('esse npm não existe')

            let embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(data.name)
                .setDescription(`${data.description || ''}\nhttps://www.npmjs.com/package/${data.name}`)
                .addField('Versão', data['dist-tags'].latest)
                .setThumbnail('attachment://image.png')

            msg.channel.send({
                embed: embed,
                files: [new MessageAttachment(Constants.NPM_PNG, 'image.png')]
            }).then(() => msg.channel.stopTyping())
        }) 
    }
}

module.exports = Npm