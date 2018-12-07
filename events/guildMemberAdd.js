class GuildMemberAdd {
    static on (member) {
        if (!member.user.bot) 
            member.roles.add(process.env.MEMBERS_ROLE)
        else 
            member.roles.add(process.env.BOTS_ROLE)
    }
}

module.exports = GuildMemberAdd.on