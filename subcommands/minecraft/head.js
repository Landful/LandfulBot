const {Command} = require('../../utils/Command.js')
const Mine = require('../../utils/Minecraft.js')
class Head extends Command {
    constructor(name, client) {
        super(name,client)
    }
    run(message,args) {
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
module.exports = Head;