const { Starboard,  Constants: { STARBOARD_EMOJIS: [star] } } = require('../utils/')



module.exports = async function onMessageReactionAdd ({ emoji, message, users }, user) {
    if (message.author.bot || user.bot)
        return

    if (emoji.name == star)
        await Starboard.check(message, users)
}
