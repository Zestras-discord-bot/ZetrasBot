const Discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
    "run": async (discord, bot, msg, args) => {
        if(!args[0]) return msg.channel.send("And who do you want to kiss?");

    let message = await msg.channel.send("Generating...")

    let kUser = msg.mentions.users.first() || msg.guild.members.get(args[0])

    let {body} = await superagent
    .get(`https://nekos.life/api/kiss`)

    if(!{body}) return msg.channel.send("I broke! Try again.")


      let kEmbed = new discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setDescription(`**${msg.author.username}#${msg.author.discriminator}** is kissing **${kUser.username}#${kUser.discriminator}** O.O`)
      .setImage(body.url)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.tag} | Powered by nekos.life`, msg.author.avatarURL)

     msg.channel.send({embed: kEmbed})

     message.delete();
    },
    "name": "kiss",
    "aliases": ["snog"],
    "description": "Kiss someone"
};