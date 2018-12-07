const { Constants } = require('../utils')
class GuildMemberAdd {
    static on (member) {
        if (!member.user.bot) 
            member.roles.add(Constants.MEMBERS_ROLE)
        else 
            member.roles.add(Constants.BOTS_ROLE)
    }
}

module.exports = GuildMemberAdd.on