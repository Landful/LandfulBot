require('http').createServer().listen(3000)
require('dotenv').config()
const LandfulBot = require('./LandfulBot.js');
const Config = require('./config.json')
const client = new LandfulBot(Config)

client.login(process.env.TOKEN)
