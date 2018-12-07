const { STAFF_ROLE } = require('./Constants.js')
const { MessageEmbed } = require('discord.js')
class Command {
    constructor (name, client) {
        this.name = name
        this.parent = ''
        this.client = client
        this.aliases = []
        this.category = 'normal'
        this.argsRequired = false
        this.usage = ''
        this.adminOnly = false
        this.subcommandsOnly = false
        this.invalidArgsMessage = ''

        this.subcommands = []
        this.examples = []
    }

    get tag () {
        return `${this.client.prefixes[0]}${this.name} ${this.usage}`
    }

    process (message, args) {
        if (this.adminOnly && !(message.guild && message.member.roles.has(STAFF_ROLE)))
            return

        if (this.argsRequired && args.length === 0)
            return typeof this.invalidArgsMessage === 'function' ? this.invalidUsageMessage(message, args) : message.channel.send(this.invalidArgsMessage)
        
        let sub = this.subcommands.find(s => s.name === args[0] || s.aliases.includes(args[0]))
        
        if (sub)
            return sub.process(message, args.slice(1))
        else if (!sub && this.subcommandsOnly)
            return message.channel.send(this.embedHelpSUBS(message))
        else
            return this.run(message, args)
    }

    embedHelpSUBS (message) {
        return new MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setTitle('SubComandos')
            .setDescription(this.subcommands.map((c) => `\`${this.tag} ${c.name} ${c.usage}\` ${c.description}`).join('\n'))
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date())
    }
    run () {}
}

module.exports = Command