const { MessageEmbed } = require('discord.js');
const { STARBOARD_EMOJIS: emojis, STARBOARD_ID } = require('./Constants.js');

class Starboard {
    static async check(message, _users) {
        let _message = message;
        let _users = users.filter(u => !u.bot);
        let channel = _message.client.channels.get(STARBOARD_ID);

        let msg = await channel.messages
            .fetch({ limit: 100 })
            .then(m =>
                m.find(m => 
                    m.embeds[0] && 
                    m.embeds[0].fields.length > 1 &&
                    m.embeds[0].fields[1].value.includes(_message.id))   
            )

        if (!msg)
            return channel.send(`${this.getEmoji(_users)} ${_users.size}`, this.createEmbed(_message))
        else if (_users.size === 0)
            return msg.delete()
        else 
            return msg.edit(`${this.getEmoji(_users)} ${_users.size}`, this.createEmbed(_message))

            
    }

    static getEmoji(users) {
        return users.size >= 1 ? emojis[0] : users.size >= 5 ? emojis[1] : emojis[2]
    }

    static createEmbed(message) {
        let image = Object.values(message.embeds[0] || {}).filter(k => k).find(r => r.url)
        return new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(message.content)
        .addField('Canal', message.channel, true)
        .addField('Mensagem', `[Pular](${message.url})`, true)
        .setImage(image ? image.url : null)
        .setColor('GOLD');
    }

}

module.exports = Starboard;