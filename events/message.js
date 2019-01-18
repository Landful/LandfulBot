const { Constants } = require('../utils')

module.exports = async function onMessage (message) {
    const botMention = message.guild ? message.guild.me.toString() : this.user.toString()
    const prefix = message.content.startsWith(botMention) ? `${botMention} ` : (message.content.startsWith(process.env.PREFIX) ? process.env.PREFIX : null)
    if (prefix) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const name = args.shift()
        const command = this.commands.find(command => command.name === name || command.aliases.includes(name))
        Object.defineProperties(message, {
            'prefix': { value: prefix },
            'command': { value: prefix }
        })
        if (command) {
            command.process(message, args)
        }
    }

    const messages = message.channel.messages.last(3)
    const validContent = messages.filter((m) => 
        !m.author.bot &&
        m.content.toLowerCase().includes('hm')).map(m => m.author.id)
    const validAuthors = validContent.every((e, i, a) => a.indexOf(e) === i)

    if (validAuthors && validContent.length === 3) {
        const Villager = await message.channel.createWebhook('Villager', { avatar: Constants.VILLAGER_PNG })
        await Villager.send('hm')
        await Villager.delete()
    }        
}
