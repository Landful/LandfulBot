const { Command, Constants } = require('../utils')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const ApiNpm = require('api-npm')

class Npm extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
    }

    async run (msg, args) {
        let query = args.join(' ').toLowerCase()

        ApiNpm.getdetails(query, (data) => {
            if (data.error === 'Not found')
                return msg.channel.send('Pacote não encontrado')

            let embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(data.name)
                .setDescription(`${data.description || ''}\nhttps://www.npmjs.com/package/${data.name}`)
                .setThumbnail('attachment://image.png')

            if (data['dist-tags'])
                embed.addField('Versão', data['dist-tags'].latest)

            msg.channel.send({
                embed: embed,
                files: [new MessageAttachment(Constants.NPM_PNG, 'image.png')]
            })
        }) 
    }
}

module.exports = Npm