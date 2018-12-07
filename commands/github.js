const { Command, Github } = require('../utils/')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-BR')

class CommandGithub extends Command {
    constructor(name, client) {
        super(name, client)
        this.subcommandsOnly = true
        this.subcommands = [
            new GithubUser('user', client),
            new GithubRepos('repos', client),
            new GithubRepo('repo', client)
        ]
    }
}

class GithubUser extends Command {
    constructor(name, client) {
        super(name, client);
        this.argsRequired = true;
        this.aliases = ['u'];
        this.description = 'usúario do github'
        this.usage = '[username]'
        this.invalidArgsMessage = `Preciso do username do usúario. \`${this.tag}\``
    }

    async run(message, [name]) {
        try {
            let user = await Github.getUser(name)
            let stars = await Github.getUserInfo('starred_url', user.login)
            let orgs = await Github.getUserInfo('organizations_url', user.login)
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(user.name ? user.login : '')
                .setAuthor(user.name ? user.name : user.login, user.avatar_url, user.html_url)
                .setThumbnail(user.avatar_url)
            
            if (user.bio)
                embed.addField('Biografia', user.bio || '')

            embed.addField('Conta Criada', moment(user.created_at).format('LLLL'))

            if (user.location)
                embed.addField('Localização', user.location, true)

            if (user.blog)
                embed.addField('Blog', user.blog, true)

            if (user.email)
                embed.addField('Email', user.email)
            
            embed.addField('Seguidores', user.followers, true)
                .addField('Seguindo', user.following, true)
                .addField('Estrelas', stars.length, true)
                .addField('Organizações', orgs.length, true)
                .addField('Repositórios', user.public_repos, true)
                .addField('Gists', user.public_gists, true)

            message.channel.send(embed)
        } catch (err) {
            message.channel.send('ERROR: ' + err.message)
            console.log(err)
        }
    }
}

class GithubRepos extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['rs']
        this.description = 'Repositórios do usúario'
        this.usage = '[username]'
        this.argsRequired = true
    }

    async run(message, [name]) {
        try {
            let user = await Github.getUser(name)
            let repos = await Github.getUserInfo('repos_url', name)
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
                 created.map(repo => `[${repo.name}](${repo.html_url})`).slice(0, 10).join('\n') + (created.length < 10 ? '' : `\n*mais ${created.length-10} repositórios...*`))
            
            if (forks.length !== 0) 
                embed.addField('Forks', forks.map(repo => `[${repo.name}](${repo.html_url})`).slice(0, 10).join('\n') + (forks.length > 10 ? `\n*mais ${forks.length-10} repositórios...*` : ''))

        message.channel.send(embed)

        } catch (err) {
            message.channel.send('ERROR: ' + err.message)
            console.log(err)
        }
    }
}

class GithubRepo extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['r']
        this.argsRequired = true
        this.description = 'informações de um repositório'
        this.usage = '[username] [repo]'
    }

    async run(message, [name, repo_name]) {
        try {
            if (!repo_name)
            return message.channel.send('você não disse o nome do repositório')

            let repos = await Github.getUserInfo('repos_url', name)
            let repo = repos.find(repo => repo.name.toLowerCase() === repo_name.toLowerCase())
            
            if (!repo)
                return message.channel.send(`**${name}** não tem nenhum repositório com esse nome`)
            
            repo = await Github._requestJSON(repo.url)
            console.log(repo.url)
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(repo.owner.login, repo.owner.avatar_url, repo.owner.html_url)
                .setThumbnail(repo.owner.avatar_url)
                .setTitle(repo.name)
                .setURL(repo.html_url)
                .setDescription(repo.description || '')
                .addField('Branch Principal', repo.default_branch)
//.addField('Linguagem Principal', repo.language, true)

            let languages = await Github._requestJSON(repo.languages_url)

            if (Object.keys(languages).length > 1) {
                languages = Object.entries(languages)
                let total = languages.reduce((c, [key, value]) => c += value, 0)
                let message_languages = languages
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([l, v]) => { 
                        let result = Math.round((v/total)*100)
                        return `${result === 0 ? String(v).slice(3) : result }% ${l} ${v}`
                    }).join('\n')
                embed.addField(languages.length + ' Linguagens Usadas', message_languages, true);
            }

            if (repo.parent)
                embed.addField('Origem', `[${repo.full_name}](${repo.html_url})`, true)
            
            if (repo.license)
                embed.addField('Licença', `[${repo.license.name}](${repo.license.url})`, true)

            let contributors = await Github._requestJSON(repo.contributors_url)
            console.log(contributors)
            if (contributors.length > 1)
                embed.addField('Contribuidores', contributors.map(c=> `[${c.login}](${c.html_url})`).join('\n'), true)

            embed.addField('Forks', `[${repo.forks_count}](${repo.html_url}/forks)`, true)
                .addField('Estrelas', `[${repo.stargazers_count}](${repo.html_url}/stargazers)`, true)
                .addField('Seguidores', repo.subscribers_count, true)
                .addField('Downloads', repo.network_count, true)
                .addField('Clone URL', repo.clone_url, true)

                
            
            message.channel.send(embed)

            } catch(error) {
                message.channel.send('ERROR: ' + error.message)
                console.log(error)
            }
    }
}

module.exports = CommandGithub;