const {Command} = require('../../utils/Command.js')
const Mine = require('../../utils/Minecraft.js')
class Avatar extends Command {
    constructor(name, client) {
        super(name,client)
    }
    run(message, args) {
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
}
module.exports = Avatar;