const Discord = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
    let botembed = new discord.MessageEmbed()

    .setTitle(`Check out Zestras social media!`)
    .setDescription(`**Twitter:** https://twitter.com/iZestify\n **Instagram:** https://instagram.com/izestras/\n **Telegram:** https://t.me/joinchat/LQ4yJRXu8dsXu-M2B8N-qg`)
    .setThumbnail(`https://media.giphy.com/media/vWQiiaEIPhxRD2oBKk/giphy.gif`)
    .setColor("0x36393E")
    .setFooter(`© 2019 ${bot.user.username}`, bot.user. displayAvatarURL);
    message.channel.send(botembed);
  },
  "name": "social",
  "description": "Get a list of Zestras' social medias"
}