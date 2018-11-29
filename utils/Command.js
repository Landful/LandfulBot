const { STAFF_ROLE } = require('./Constants.js');
class Command {
    constructor(name, client) {
        this.name = name;
        this.client = client;
        this.aliases = [];
        this.category = 'normal';
        this.argsRequired = false;
        this.usage = '';
        this.adminOnly = false;

        this.invalidArgsMessage = '';
    }

    get tag() {
        return `${this.client.prefixes[0]}${this.name} ${this.usage}`;
    }

    process(message, args) {
        if (this.adminOnly && !message.member.roles.get(STAFF_ROLE))
            return;

        if (this.argsRequired && args.length === 0)
            return typeof this.invalidArgsMessage === 'function' ? this.invalidUsageMessage(message, args) : message.channel.send(this.invalidArgsMessage);
        return this.run(message, args);
    }

    run () {}
}

module.exports = Command;