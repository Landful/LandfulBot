module.exports = function onMessage(message) {
    let args = message.content.split(' ');
    let prefix = this.prefixes.find(prefix => message.content.startsWith(prefix));
    
    if (prefix) {
        let name =  prefix.includes(this.user.id) ? args[1] : args[0].slice(prefix.length);
        let command = this.commands.find(command => command.name === name || command.aliases.includes(name));
       
        if (command) {
            command.process(message, args.slice(1));
        }
    }
}