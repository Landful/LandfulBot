const url = 'https://api.github.com'
const fetch = require('node-fetch')

class GitHub {
    static _requestJSON(url) {
        return new Promise((resolve, reject) => {
            fetch(url + '?access_token=' + process.env.GITHUB_TOKEN)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(error => reject(error));
        });
    }

    static getUser(username) {
        let user_url = `${url}/users/${username}`
        return new Promise((resolve, reject) => {
            this._requestJSON(user_url)
                .then(data => {
                    if (data.message)
                        reject(data)
                    else 
                        resolve(data)
                })
                .catch(reject)
        });
    }

    static getUserInfo(info, username) {
        return new Promise((resolve, reject) => {
            this.getUser(username)
            .then(user => {
                this._requestJSON(user[info].split('{')[0])
                    .then(data => resolve(data))
                    .catch(error => reject(error))
            })
            .catch(error => reject(error))
        })
    }
 }

 module.exports = GitHub;