const { Command } = require('../utils/');

class Ping extends Command {
    constructor(name, client) {
        super(name, client);
    }

    run(message) {
        return message.channel.send(`:ping_pong: | Pong!`);
    }
}

module.exports = Ping;