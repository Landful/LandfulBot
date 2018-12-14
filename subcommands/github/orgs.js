const { Command, Github } = require('../../utils')
const { MessageEmbed } = require('discord.js')

class Orgs extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['os']
        this.description = 'As Organizações de um usuário'
    }

    async run (message, [username]) {
        let user = await Github._requestJSON(`/users/${username}`)
        let orgs = await Github._requestJSON(`/users/${username}/orgs`)
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(user.login, user.avatar_url, user.html_url)
            .setTitle('Organizações')
            .setDescription(orgs.length === 0 ? `Usuário não faz parte de nenhuma organização` 
                : (await Promise.all(orgs.map(async o => {
                    let org = await Github._requestJSON(o.url, false)
                    return `[${o.login}](${org.html_url})`
                }))).join('\n'))
        message.channel.send(embed)
    }
}

module.exports = Orgs