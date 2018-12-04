const { MessageEmbed } = require('discord.js')

const emojis = ['\u2B50', '\u1F31F', '\u1F320']

module.exports = async function onMessageReactionAdd (reaction) {
    if (reaction.emoji.name === '\u2B50') { // star emoji
        let { message, users } = reaction
        let emoji = users.size >= 1 ? emojis[0] : users.size >= 5 ? emojis[1] : emojis[2]
        let channel = message.guild.channels.get('519526821214289950')
        let image = Object.values(message.embeds[0] || {}).filter(k => k).find(r => r.url)
        let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(message.content)
            .addField('Canal', message.channel, true)
            .addField('Mensagem', `[Pular](${message.id})`)
            .setImage(image ? image.url : null)
            .setColor('GOLD')
        let msg

        if (users.size > 1)
            msg = await channel.messages
                .fetch({ limit: 200 })
                .find(m => 
                    m.embeds[0] && 
                    m.embeds[0].fields.length > 1 &&
                    m.embeds[0].fields[1].value.includes(message.id))

        if (!msg)
            await channel.send(`${emoji} ${users.size}`, embed)
        else
            msg.edit(`${emoji} ${users.size}`, embed)
    }
}
