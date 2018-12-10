const {Command} = require('../../utils/Command.js')
const Mine = require('../../utils/Minecraft.js')
class Skin extends Command {
    constructor(name, client) {
        super(name,client)
    }
    run(message,args) {
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
}
module.exports = Skin;