const { Command, Github } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-BR')

class Org extends Command {
    constructor (name, client) {
        super(name, client)
        this.aliases = ['o']
        this.argsRequired = true
        this.description = 'Informações de uma organização'
    }

    async run (message, args) {
        let query = args.join(' ')
        let org = await Github._requestJSON('/orgs/' + query)
        
        if (org.message === 'Not Found')
            return message.channel.send(`Não existe nenhuma organização com esse nome`)

        let embed = new MessageEmbed()
            .setAuthor(org.login, org.avatar_url, org.html_url)
            .setThumbnail(org.avatar_url)
            .setDescription(org.description)
            .setColor('RANDOM')
        if (org.name)
            embed.addField('Nome', org.name, true)
        
        if (org.location)
            embed.addField('Localização', org.location, true)
        
        if (org.blog)
            embed.addField('Blog', org.blog, true)
        
        if (org.email)
            embed.addField('Email', org.email, true)

        embed.addField('Verificado', org.is_verified ? 'Sim' : 'Não')
            .addField('Criado em', moment(org.created_at).format('lll'), true)
            .addField('Ultima modificação', moment(org.updated_at).format('lll'), true)

        let members = await Github._requestJSON('/orgs/' + query + '/members')
        
        if (Array.isArray(members)) {
            embed.addField(`[${members.length}] Membros`, 
                members.slice(0, 10).map(m => `[${m.login}](${m.html_url})`).join('\n') +
                (members.length > 10 ?  `\n*mais ${members.length - 10} membros...*` : ''), true)
        }

        let repos = await Github._requestJSON('/orgs/' + query + '/repos')

        if (Array.isArray(repos)) {
            embed.addField(`[${org.public_repos}] Repositórios`, 
                repos.slice(0, 10).map(r => `[${r.name}](${r.html_url})`).join('\n') +
                (repos.length > 10 ?  `\n*e outros ${org.public_repos - 10} repositórios...*` : ''), true)
        }

        message.channel.send(embed)
    }
}

module.exports = Org