const request = require("request");
const { RichEmbed } = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
    request.get("https://blockchain.info/ticker", (error, response, body) => {
      const result = JSON.parse(response.body);
      const GBP = result.GBP;
      const USD = result.USD;
      const EUR = result.EUR;
      
      message.channel.send(new discord.MessageEmbed()
      .setTitle("Bitcoin (BTC) Current Price")
      .setDescription(`**United States Dollars (USD) [$]: \`${(USD.buy + USD.sell) / 2}\`**\n**Great British Pounds (GBP) [£]: \`${(GBP.buy + GBP.sell) / 2}\`**\n**Euros (EUR) [€] \`${(EUR.buy + EUR.sell) / 2}\`**`)
      .setThumbnail(`https://bitcoin.org/img/icons/opengraph.png?1567256764`)
      .setFooter(`© 2020 ${bot.user.username}`, bot.user. displayAvatarURL)
      .setTimestamp());
    });
  },
  "name": "btc",
  "description": "Get the current calue of one bitcoin."
};