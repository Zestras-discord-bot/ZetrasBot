const Discord = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
    let botembed = new discord.MessageEmbed()
    .setDescription(`**[Click Here](https://zestras.net)**`)
    .addField(`You can check out Zestras shop link at`, `http://zestras.net/`)
    .setThumbnail(`https://media.giphy.com/media/vWQiiaEIPhxRD2oBKk/giphy.gif`)
    .setColor("0x36393E")
    .setFooter(`© 2019 ${bot.user.username}`, bot.user. displayAvatarURL);
    message.channel.send(botembed);
  },
  "name": "shop",
  "description": "Zestras' shop"
}