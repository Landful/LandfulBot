const URL = 'https://api.github.com'
const fetch = require('node-fetch')

class GitHub {
    static _requestJSON (url, defaultURL = true) {
        return new Promise((resolve, reject) => {
            fetch((defaultURL ? URL : '') + url + '?access_token=' + process.env.GITHUB_TOKEN)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(error => reject(error))
        })
    }

    static getUser (username) {
        return new Promise((resolve, reject) => {
            this._requestJSON(`/users/${username}`)
                .then(data => {
                    if (data.message)
                        reject(data)
                    else 
                        resolve(data)
                })
                .catch(reject)
        })
    }
}

module.exports = GitHub