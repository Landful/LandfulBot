const { Command } = require('../utils/')
const { inspect } = require('util')

class Eval extends Command {
    constructor (name, client) {
        super(name, client)
        this.adminOnly = true
        this.argsRequired = true
        this.usage = '[code]'
    }

    async run (msg, args) {
        let code = args.join(' ').replace(/^```(js|javascript ? \n )?|```$/gi, '')
        try {
            console.log(code)
            let message = await this.result(eval(code))

            console.debug('\n' + message)

            if (message.length > 2000)
                message = 'Mensagem muito longa, veja o console'

            msg.channel.send(await this.clean(message), { code: 'js' })
        } catch (error) {
            console.error(error)

            msg.channel.send(error.message, { code: 'js' })
                .catch(console.error)
        }
    }

    async clean (text) {
        if (text instanceof Promise || (Boolean(text) && typeof text.then === 'function' && typeof text.catch === 'function'))
            text = await text
        if (typeof text !== 'string') 
            text = inspect(text, { depth: 0, showHidden: false })

        text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
        return text
    }

    async result (temp) {
        if (temp && temp[Symbol.toStringTag] === 'AsyncFunction')
            return this.result(await temp())
        if (temp && temp instanceof Promise)
            return this.result(await temp)

        return temp
    }
}

module.exports = Eval
