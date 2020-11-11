const discord = require('discord.js');
const bot = new discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});

const fs = require("fs");
const { run } = require("./commands/ticket-setup");
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

    const content = message.content.split(" ");
    const command = content[0].replace(config.prefix, "");
    const args = content.slice(1);

    if(!bot.commands.has(command)) return message.channel.send("*Command not found.*");
    else bot.commands.get(command).run(discord, bot, message, args);
});


// bot.on('raw', (event) => {
//   if (event.t === 'MESSAGE_REACTION_ADD') {

//     if (event.d.emoji.name == '🎫'){
      
//       const guild =  bot.guilds.fetch(event.d.guild_id);
//       console.log('-----------');
//       console.log(guild);

//       const channel =  bot.channels.cache.get(event.d.channel_id);
//       console.log('-----------');
//       console.log(channel);

//       const user = guild.members.fetch(event.d.user_id);
//       console.log('-----------');
//       console.log(user);

      
//     }
//   }})

bot.on('messageReactionAdd', async (reaction, user) => {

  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  if(user.bot) return;

  // console.log(reaction,user)

  if( reaction.emoji.name == '🎫') {
      reaction.users.remove(user);

      reaction.message.guild.channels.create(`ticket-${user.username}`, {
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }
          ],
          type: 'text'
      }).then(async channel => {
          channel.send(`<@${user.id}>`, new discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00"))
      },e => console.log(e))
  }
});


const app = require("express")();

app.get("/", (request, response) => {
  response.send("OK");
});

app.listen(3000);


setInterval(() => {
  require("request").get(" https://izestras.glitch.me/");
}, 1000 * 60);