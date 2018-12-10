const request = require('request-promise-native')
//By StormKauan#9237 hehe
class Mine {
    
     static async getUUID(nickname) {
         return new Promise(async (result, rej) => {
        let _getUUID_ = await request({url: `https://api.mojang.com/users/profiles/minecraft/${nickname}`, json: true})
        try {
            result(_getUUID_.id)
        } catch(err) {
            rej(err)
            }
        })
    }

   static async getSkin(nickname) {
       return new Promise(async (result, erro) => {
           try {
               let ID = this.getUUID(nickname)
               result(`https://visage.surgeplay.com/skin/${ID}`)
           } catch(err) {
               console.log(err)
           }
       })
   }
   static async getAvatar(nickname) {
    return new Promise(async (result, erro) => {
        try {
            let ID = this.getUUID(nickname)
            result(`https://visage.surgeplay.com/face/${ID}`)
        } catch(err) {
            console.log(err)
        }
    })
}
static async getBody(opção) {
    return new Promise(async (result, erro) => {
        try {
            let ID = this.getUUID(nickname)
            if(opção == "1") result(`https://visage.surgeplay.com/front/${ID}`)
            if(opção == "2") result(`https://visage.surgeplay.com/frontfull/${ID}`)
        } catch(err) {
            erro(err)
            console.log(err)
        }
    })
}
static async getHead(nickname) {
    return new Promise(async (result, erro) => {
        try {
            let ID = this.getUUID(nickname)
            result(`https://visage.surgeplay.com/head/${ID}`)
        } catch(err) {
            console.log(err)
        }
    })
}
static async getServer(ip) {
    return new Promise(async (result, erro) => {
    let sv = await request({url: `https://mcapi.us/server/status?ip=${ip}`, json: true})
    try {
        result(sv)
    }catch(err) {
        erro(err)
        console.log(err)
            }
        })
    }
}
module.exports = Mine;