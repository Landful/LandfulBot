const { Command } = require('../utils/')
const { MessageEmbed } = require('discord.js');
const Mine = require('../utils/Minecraft.js')
class Minecraft extends Command {
    constructor(name, client) {
        super(name, client)
    }
    run(message, args) {
        let embed = new MessageEmbed()
        .setTitle('Minecraft')
        .setDescription('O comando de minecraft faz com que você possa ver sua skin, o avatar de sua skin entre outros...')
        .setColor('RANDOM')

        if(!args[0] || args[0] == 'help') return message.reply(embed)

        if(args[0] == 'skin') {
            if(!args[1]) {
                message.channel.send('você deve falar o nickname do usuário.')
            }
            Mine.getSkin(`${args[0]}`).then(result => {
                let embed = new MessageEmbed()
                    .setTitle(`Skin - ${args[1]}`)
                    .setThumbnail(result)
                    .addField('Skin URL', `[Download](${result} 'Clique para ir')`)
                    .setColor('RANDOM')
                    message.channel.send(embed)
            }).catch(err => {
                console.log(err)
                message.reply('este usuário não existe.')
            })
        }
        if(args[0] == 'body') {
            if(!args[1]) {
                message.channel.send('você deve falar o nickname do usuário.')
            }
            if(!args[2]) {
                message.channel.send('você deve escolher uma opção de body. Opções: `1 ou 2`')
            }
            Mine.getBody(`${args[1]}`, `${args[2]}`).then(result => {
                let embed = new MessageEmbed()
                .setTitle(`Body - ${args[1]}`)
                .setThumbnail(result)
                .addField(`Body(${args[2]}) URL`, `[Download](${result} 'Clique para ir')`)
                .setColor('RANDOM')
                message.channel.send(embed)
            }).catch(err => {
                console.log(err)
                message.reply('este usuário não existe.')
            })
        }
        if(args[0] == "avatar") {
            if(!args[1]) {
                message.channel.send('você deve falar o nickname do usuário.')
            }
            Mine.getAvatar(`${args[1]}`).then(result => {
                let embed = new MessageEmbed()
                .setTitle(`Avatar - ${args[1]}`)
                .setThumbnail(result)
                .addField('Avatar URL', `[Download](${result} 'Clique para ir')`)
                .setColor('RANDOM')
                message.channel.send(embed)
            }).catch(err => {
                console.log(err)
                message.reply('este usuário não existe.')
            })
        }
        if(args[0] == "head") {
            if(!args[1]) {
                message.channel.send('você deve falar o nickname do usuário.')
            }
            Mine.getHead(`${args[1]}`).then(result => {
                let embed = new MessageEmbed()
                .setTitle(`Head - ${args[1]}`)
                .setThumbnail(result)
                .addField('Head URL', `[Download](${result} 'Clique para ir')`)
                .setColor('RANDOM')
                message.channel.send(embed)
            }).catch(err => {
                console.log(err)
                message.reply('este usuário não existe.')
            })
        }
    }
}
module.exports = Minecraft;