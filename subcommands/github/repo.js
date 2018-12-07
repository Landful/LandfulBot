const { Command, Github } = require('../../utils')
const { MessageEmbed } = require('discord.js')

class Repo extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['r']
        this.argsRequired = true
        this.description = 'informações de um repositório'
        this.usage = '[username] [repo]'
    }

    async run (message, [name, repoName]) {
        try {
            if (!repoName)
                return message.channel.send('você não disse o nome do repositório')

            let url = `/repos/${name.toLowerCase()}/${repoName.toLowerCase()}`
            let repo = await Github._requestJSON(url)
            if (!name || !repo)
                return message.channel.send(`user/org ou repo está incorreto`)

            let languages = Object.entries(await Github._requestJSON(repo.languages_url, false))
            let contributors = await Github._requestJSON(repo.contributors_url, false)
            let branches = await Github._requestJSON(repo.url + '/branches', false)
            let commits = await Github._requestJSON(repo.url + '/commits', false)

            let v = (msg, url, i = 0) => `[${msg}](${ i === 0 ? `${repo.html_url}/${url}` : url})`

            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(repo.owner.login, repo.owner.avatar_url, repo.owner.html_url)
                .setThumbnail(repo.owner.avatar_url)
                .setTitle(repo.name)
                .setURL(repo.html_url)
                .setDescription(repo.description || '')
                .addField(`[${branches.length}] Branches`, v(`${repo.default_branch} *(principal)*`, `${repo.html_url}/tree/${repo.default_branch}`, 1))

            let total = languages.reduce((c, l) => c += l[1], 0)
            let messageLanguages = languages
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([l, v]) => { 
                    let result = Math.round((v / total) * 100)
                    return `${result === 0 ? String(v).slice(3) : result}% ${l} ${v}`
                }).join('\n')

            embed.addField(`[${languages.length}] Linguagens`, v(messageLanguages, repo.languages_url, 1), true)
    
            if (repo.parent)
                embed.addField('Origem', v(repo.full_name, repo.html_url, 1), true)
            
            if (repo.license)
                embed.addField('Licença', v(repo.license.name, repo.license.url, 1), true)

            if (contributors.length > 1)
                embed.addField(`[${contributors.length}] Contribuidores`, contributors.map(c => v(c.login, c.html_url, 1)).slice(0, 5).join('\n'), true)

            embed.addField('Forks', v(repo.forks_count, 'forks'), true)
                .addField('Estrelas', v(repo.stargazers_count, 'stargazers'), true)
                .addField('Seguidores', v(repo.subscribers_count, 'watchers'), true)
                .addField('Downloads', v(repo.network_count, 'network'), true)
                .addField('Commits', v(commits.length, `commits/${repo.default_branch}`), true)
                .addField('Clone URL', `\`${repo.clone_url}\``, true)

            message.channel.send(embed)
        } catch (error) {
            message.channel.send('ERROR')
            console.log(error)
        }
    }
}

module.exports = Repo