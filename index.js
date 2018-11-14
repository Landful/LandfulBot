require('dotenv').config();
const LandfulBot = require('./LandfulBot.js');
const Config = require('./config.json');
const client = new LandfulBot(Config);

client.initCommands('./commands');
client.initListeners('./events');

client.login(process.env.token);
