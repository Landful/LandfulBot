const { Command } = require('../utils/')

class CommandGithub extends Command {
    constructor (name, client) {
        super(name, client)
        this.subcommandsOnly = true
    }
}

module.exports = CommandGithub