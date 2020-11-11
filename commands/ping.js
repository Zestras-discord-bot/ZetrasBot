const Discord = require('discord.js')

module.exports = {
  "run": async (discord, bot, message, args) => {
    let sm = await message.channel.send('Pinging...');
    let embed = new discord.MessageEmbed()
    .setColor('006aff')
    .setTitle(`Here are my pings:`)
    // .addField('Client Ping',Math.floor(bot.ping*100)/100 + ' ms')
    .addField('Message Roundtrip', sm.createdAt - message.createdAt + ' ms')
    .addField('Bot Uptime since last restart', require("moment")(bot.uptime).format("HH[ hour(s)], mm[ minute(s), and ]ss[ second(s)]"));// Bitch ass nigger    
    sm.edit(embed);
  },
  "name": "ping",
  "description": "Check the bot's ping."
}
