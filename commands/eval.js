const { Command } = require('../utils/')

class Ping extends Command {
    constructor (name, client) {
        super(name, client)

        this.adminOnly = true
    }

    async run (msg) {
        let code = msg.content.split(/\s+/).slice(1).join(' ').replace(/^```(js|javascript ?\n)?|```$/gi, '')
        let ins  = e => typeof e === 'string' ? e : util.inspect(e, { depth: 1 })
        let encodeblock = arg => `\`\`\`js\n${arg}\n\`\`\``

        try {
            let result = async (temp) => {
                if (temp && temp[Symbol.toStringTag] === 'AsyncFunction')
                    return result(await temp())
                if (temp && temp instanceof Promise)
                    return result(await temp)

                return temp
            }

            let message = ins(await result(eval(code)))

            console.debug('\n' + message)

            if (message.length > 2000)
                message = 'Mensagem muito longa, veja o console'

            msg.channel.send(encodeblock(message))
        } catch (error) {
            console.error(error)

            msg.channel.send(encodeblock(error))
                .catch(console.error)
        }
    }
}

module.exports = Ping
