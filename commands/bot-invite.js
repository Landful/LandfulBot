const { Command } = require('../utils/')
const { MessageEmbed } = require('discord.js')

class Invite extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
        this.aliases = ['invite', 'bot-i', 'bi']
        this.usage = '[IDs]'
        this.invalidArgsMessage = `Preciso do ID do bot. \`${this.tag}\``
    }

    async run (message, args) {
        let ids = args.join(' ').match(/\d{17,19}/g)

        if (!ids)
            return message.channel.send(this.invalidArgsMessage)

        let bots = (await Promise.all(ids.map(id => this.client.users.fetch(id).catch(() => null))))
            .filter(user => user && user.bot)

        if (bots.length === 0)
            return message.channel.send(this.invalidArgsMessage)

        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Convites')
            .setDescription(bots.map(bot => `[${bot.username}](https://discordapp.com/oauth2/authorize?&client_id=${bot.id}&scope=bot)`).join('\n'))

        message.channel.send(embed)
    }
}

module.exports = Invite