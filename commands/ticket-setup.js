const discord = require("discord.js");


module.exports = {
    "run": async (discord, bot, message, args) => {
        if(message.author.bot) return;
        // ticket-setup #channel

        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Usage: `!ticket-setup #channel`");

        let sent = await channel.send(new discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React to open a ticket!")
            .setFooter("Ticket System")
            .setColor("00ff00")
        );

        sent.react('🎫');

        message.channel.send("Ticket System Setup Done!")
    },
    "name": "ticket septup",
    "description": "Choose the channel where you want the ticket embed message."
  };