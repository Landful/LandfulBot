class Command {
    constructor (name, client) {
        this.name = name
        this.client = client
        this.aliases = []
        this.category = 'normal'
        this.adminOnly = false
    }

    process (message, args) {
        if (this.adminOnly && !message.member.roles.has('318166278881673217'))
            return
            
        return this.run(message, args)
    }

    run () {}
}

module.exports = Command
