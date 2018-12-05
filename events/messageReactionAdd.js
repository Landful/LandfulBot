const { MessageEmbed } = require('discord.js')
const { Constants } = require('../utils/')
const { STARBOARD_EMOJIS: emojis } = Constants

module.exports = async function onMessageReactionAdd ({ emoji, message, users }) {
    if (message.author.bot)
        return

    if (emoji.name === emojis[0]) {
        users = users.filter(user => !user.bot);
        let emoji = users.size >= 1 ? emojis[0] : users.size >= 5 ? emojis[1] : emojis[2]
        let channel = message.guild.channels.get(Constants.STARBOARD_ID)
        let image = Object.values(message.embeds[0] || {}).filter(k => k).find(r => r.url)
        let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(message.content)
            .addField('Canal', message.channel, true)
            .addField('Mensagem', `[Pular](${message.url})`, true)
            .setImage(image ? image.url : null)
            .setColor('GOLD')
        let msg

        if (users.size > 1)
            msg = await channel.messages
                .fetch({ limit: 100 })
                .then(m =>
                    m.find(m => 
                        m.embeds[0] && 
                        m.embeds[0].fields.length > 1 &&
                        m.embeds[0].fields[1].value.includes(message.id))
                )

        if (!msg)
            await channel.send(`${emoji} ${users.size}`, embed)
        else
            msg.edit(`${emoji} ${users.size}`, embed)
    }
}
