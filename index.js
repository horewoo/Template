const keepAlive = require('./server');
const Monitor = require('ping-monitor')
const chalk = require('chalk');


keepAlive();
const monitor = new Monitor({
    website: 'https://hosterbooster.pussysugar.repl.co/', //pon el link del proyecto host de tu bot
    title: 'NAME',
    interval: 2 // minutes
});

monitor.on('up', (res) => console.log(chalk.blue(chalk.bold(`Monitor`)), (chalk.white(`>>`)),chalk.red(`${res.website} está encedido.`)));
monitor.on('down', (res) => console.log(`! ${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`? ${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));
////////////////////////////////////////////////////////

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { configenv } = require('dotenv');
//configenv();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

const fs = require('fs');
const config = require('./config.json');

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

client.login(process.env.TOKEN)