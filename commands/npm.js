const { Command, Constants } = require('../utils')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')

const URL = 'http://registry.npmjs.org'
const getInfo = async (name) => {
    return fetch(URL + '/' + name)
        .then(response => response.json())
        .then(json => json)
}

class Npm extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
    }

    async run (msg, args) {
        const query = args.join(' ').toLowerCase()
        const data = await getInfo(query)

        if (data.error) return msg.channel.send('Pacote não encontrado')

        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(data.name)
            .setDescription(`${data.description || ''}\nhttps://www.npmjs.com/package/${data.name}`)
            .setThumbnail('attachment://image.png')
            .attachFiles(new MessageAttachment(Constants.NPM_PNG, 'image.png'))

        if (data['dist-tags'])
            embed.addField('Versão', data['dist-tags'].latest)

        msg.channel.send(embed)
    }
}

module.exports = Npm