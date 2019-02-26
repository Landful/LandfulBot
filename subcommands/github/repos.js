const { Command, Github } = require('../../utils')
const { MessageEmbed } = require('discord.js')

class Repos extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['rs']
        this.description = 'Repositórios do usúario'
        this.usage = '[username]'
        this.argsRequired = true
    }

    async run (message, [name, repo = '']) {
        try {
            let user = await Github.getUser(name)
            let repos = await Github._requestJSON(user.url + '/repos', false)

            if (repos.map(a => a.name.toLowerCase()).includes(repo.toLowerCase()))
                return this.client.commands.get('github').subcommands.find(a => a.name === 'repo').run(message, [name, repo])

            let forks = repos.filter(repo => repo.fork)
            let created = repos.filter(repo => !repo.fork)
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(user.avatar_url)
                .setAuthor(user.login, user.avatar_url, user.html_url)
                .setTitle('Repositórios')

            if (repos.length === 0)
                embed.setDescription('Usúario não tem repositórios')
            
            if (created.length !== 0)
                embed.addField('Dono', 
                    created.map(repo => `[${repo.name}](${repo.html_url})`).slice(0, 10).join('\n') + (created.length < 10 ? '' : `\n*mais ${created.length - 10} repositórios...*`))
            
            if (forks.length !== 0) 
                embed.addField('Forks', forks.map(repo => `[${repo.name}](${repo.html_url})`).slice(0, 10).join('\n') + (forks.length > 10 ? `\n*mais ${forks.length - 10} repositórios...*` : ''))

            message.channel.send(embed)
        } catch (err) {
            message.channel.send('ERROR')
            console.log(err)
        }
    }
}

module.exports = Repos 