const { Command } = require('../utils/')
const { MessageEmbed } = require('discord.js')

class Invite extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
        this.aliases = ['invite', 'bot-i', 'b-invite', 'bin']
        this.usage = '[IDs]'
    }

    async run (message, args) {
        const invalidArgsMessage = `Preciso do ID do bot. ${message.prefix + this.name} ${this.usage}`
        const ids = args.join(' ').match(/\d{17,19}/g)

        if (!ids)
            return message.channel.send(invalidArgsMessage)

        const bots = (await Promise.all(ids.map(id => this.client.users.fetch(id).catch(() => null))))
            .filter((user, i, arr) => user && user.bot && (arr.indexOf(user) === i))

        if (bots.length === 0)
            return message.channel.send(invalidArgsMessage)

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Convites')
            .setDescription(bots.map(bot => `[${bot.tag}](https://discordapp.com/oauth2/authorize?&client_id=${bot.id}&scope=bot)`).join('\n'))

        message.channel.send(embed)
    }
}

module.exports = Invite