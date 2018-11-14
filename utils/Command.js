class Command {
    constructor(name, client) {
        this.name = name;
        this.client = client;
        this.aliases = [];
        this.category = 'normal';
    }

    process(message, args) {
        return this.run(message, args);
    }

    run () {}
}

module.exports = Command;