const { Command } = require('../utils/')
const { MessageEmbed } = require('discord.js');
class Minecraft extends Command {
    constructor(name, client) {
        super(name, client)
    }
    run(message) {
        let embed = new MessageEmbed()
        .setTitle('Minecraft')
        .setDescription('O comando de minecraft faz com que você possa ver sua skin, o avatar de sua skin entre outros.Sub-Comandos: `skin, body, avatar e head`')
        .setColor('RANDOM')

        message.channel.send(embed)
    }
}
module.exports = Minecraft;