require('http').createServer().listen(3000)
require('dotenv').config()
const LandfulBot = require('./LandfulBot.js'))
const client = new LandfulBot()

client.login(process.env.TOKEN)
