const discord = require('discord.js');
const bot = new discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});

const fs = require("fs");
const config = require("./config.json");

bot.baseCommands = new discord.Collection();
bot.commands = new discord.Collection();

bot.owners = config.owners;

fs.readdirSync("./commands").forEach(file => {
    if(!file.endsWith(".js")) return;

    const command = require(`./commands/${file}`);

    bot.baseCommands.set(file.replace(".js", ""), require(`./commands/${file}`));
    bot.commands.set(file.replace(".js", ""), command);

    if(command.aliases && command.aliases.length >= 1) command.aliases.forEach(alias => bot.commands.set(alias, command));

    console.log(`Loaded ${file}`);
});

bot.login(config.token);

bot.on("ready", async () => console.log(`Logged in as ${bot.user.username}. ${bot.users.size} users. ${await bot.generateInvite(8)}`));

bot.on("message", (message) => {
    if(!message.content.startsWith(config.prefix)) return;

    if(message.content == "-done") return;
    
    
    const content = message.content.split(" ");
    const command = content[0].replace(config.prefix, "");
    const args = content.slice(1);

    if(!bot.commands.has(command)) return message.channel.send("*Command not found.*");
    else bot.commands.get(command).run(discord, bot, message, args);
});


const app = require("express")();

app.get("/", (request, response) => {
  response.send("OK");
});

app.listen(3000);


setInterval(() => {
  require("request").get(" https://izestras.glitch.me/");
}, 1000 * 60);