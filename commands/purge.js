const Discord = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**Unauthorized.**");
    if(!args[0]) return message.channel.send("**Please specify a number of messages you want to delete !**");
    message.channel.bulkDelete(parseInt(args[0]) !== NaN ? parseInt(args[0]) > 100 ? 100 : parseInt(args[0]) : 100).then(() => {
      message.channel.send("Done.")
    });
  },
  "name": "purge",
  "aliases": ["clear", "prune"],
  "description": "Delete some messages"
}