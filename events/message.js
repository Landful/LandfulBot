const { Constants } = require('../utils');
module.exports = async function onMessage (message) {
    let args = message.content.split(' ')
    let prefix = this.prefixes.find(prefix => message.content.startsWith(prefix))
    
    if (prefix) {
        let name =  prefix.includes(this.user.id) ? args[1] : args[0].slice(prefix.length)
        let command = this.commands.find(command => command.name === name || command.aliases.includes(name))
       
        if (command) {
            command.process(message, args.slice(1))
        }
    }

    let messages = await message.channel.messages.fetch({limit: 3});
    let first = message.first();
    if (messages.every((m, i) => m.toLowerCase().includes('hm') && !m.bot && (first.id !== i && m.author.id !== first.author.id))) {
        let Villager = await message.channel.createWebhook('Villager', { avatar: Constants.VILLAGER_PNG });
        await Villager.send('hm');
        await Villager.delete();
    }
}
