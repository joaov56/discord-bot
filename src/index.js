const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on("ready", () => {
    console.log(`to on como ${bot.user.username}`);
})