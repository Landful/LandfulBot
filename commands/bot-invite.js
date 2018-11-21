const { Command } = require('../utils/');
const { MessageEmbed } = require('discord.js');

class Ping extends Command {
    constructor(name, client) {
        super(name, client);
        this.argsRequired = true;
        this.aliases = ['invite'];
        this.usage = '[IDs]';
        this.invalidArgsMessage = `Preciso do ID do bot. \`${this.tag}\``;
    }

    async run(message, args) {
        let bots = (await Promise.all(args.map(id => this.client.users.fetch(id)))).filter(u => u.bot);

        if (bots.length === 0)
            return message.channel.send(this.invalidArgsMessage);

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Convites')
        .setDescription(bots.map(bot=> `[${bot.username}](https://discordapp.com/oauth2/authorize?&client_id=${bot.id}&scope=bot)`).join('\n'));

        message.channel.send(embed);
        
    }
}

module.exports = Ping;