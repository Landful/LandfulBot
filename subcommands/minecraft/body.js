const {Command} = require('../../utils/Command.js')
const Mine = require('../../utils/Minecraft.js')

class Body extends Command {
    constructor(name, client) {
        super(name,client)
    }
    run(message,args) {
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
}
module.exports = Body;