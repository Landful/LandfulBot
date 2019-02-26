const { Command, Github } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-BR')

class User extends Command {
    constructor (name, client) {
        super(name, client)
        this.argsRequired = true
        this.aliases = ['u']
        this.description = 'usúario do github'
        this.usage = '[username]'
        this.invalidArgsMessage = `Preciso do username do usúario.`
    }

    async run (message, [name]) {
        try {
            let user = await Github.getUser(name)
            let stars = await Github._requestJSON(user.url + '/starred', false)
            let orgs = await Github._requestJSON(user.url + '/orgs', false)
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
            message.channel.send('ERROR')
            console.log(err)
        }
    }
}

module.exports = User