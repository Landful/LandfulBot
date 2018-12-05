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

    const messages = message.channel.messages.last(3);
    const validContent = messages.filter((m) => 
         !m.author.bot &&
         m.content.toLowerCase().includes('hm')).map(m => m.author.id);
    const validAuthors = validContent.every((e, i, a) => a.indexOf(e) === i);
  
    if (validAuthors && validContent.length === 3) {

        const Villager = await message.channel.createWebhook('Villager', { avatar: Constants.VILLAGER_PNG });
        await Villager.send('hm');
        await Villager.delete();
    }

        
}
