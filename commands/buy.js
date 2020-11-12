const Discord = require("discord.js");
// const ms = require("ms");
const fs = require("fs");

let numTicket ;

module.exports = {
  "run": async (discord, bot, msg) => {
    msg.delete()
    
    let supportRole = msg.guild.roles.cache.find(r => r.name == "Support Team");
    if (!supportRole) return msg.channel.send("There is no `Support Team` role! Please tell an admin to create this role!");
    if (msg.channel.name != "create-ticket") return msg.channel.send(`Please use the ${msg.guild.channels.cache.find(c=> c.name == "create-ticket")} channel.`)
    let user = msg.author;
    // if (!user.bot) return msg.channel.send("Incorrect method , you will need to react to the above embed message to create a ticket");;
    if (msg.guild.channels.cache.find(c => c.topic == user.id)) return msg.channel.send(new discord.MessageEmbed()
      .setTitle("Error")
      .setDescription("You already have an opened ticket!")
      .setTimestamp()
      .setFooter(`© 2020 ${bot.user.username}`, bot.user.displayAvatarURL)
      .setColor(0xff0000))
    msg.guild.channels.create(`ticket-${user.username}`, {
        permissionOverwrites: [
          {
            id: msg.guild.roles.cache.find(r => r.name == "@everyone").id,
            deny:['VIEW_CHANNEL'],
          },
          {
            id: msg.author.id,
            allow:['VIEW_CHANNEL'],
          },
          {
            id:supportRole.id,
            allow:['VIEW_CHANNEL']
          }]})
      .then(c => c.setParent(msg.guild.channels.cache.find(channel => channel.type == "category" && channel.name == "Support").id),e => console.log(e))
      .then(c => {c.overwritePermissions([
        {
          id: msg.guild.roles.cache.find(r => r.name == "@everyone").id,
          deny:['VIEW_CHANNEL'],
        },
        {
          id: msg.author.id,
          allow:['VIEW_CHANNEL'],
        },
        {
          id:supportRole.id,
          allow:['VIEW_CHANNEL']
        },
      ]);
      return c})
      .then(c => {
          msg.channel.send(new discord.MessageEmbed()
            .setTitle("Ticket created!")
            .setDescription(`You can find it here: ${c}.`)
            .setTimestamp()
            .setFooter(`© 2020 ${bot.user.username}`, bot.user.displayAvatarURL)
            .setColor(0x00FF00))

          // let embed = new discord.MessageEmbed()
          //   .setColor("#36393E")
          //   .setTitle("Ticket created!")
          //   .setDescription('If you are looking for suppport please leave us everything we would need to help you, like the ID order , the issue with the account and your payment methos , in case you Paid with PP leave us your PP email as well.')
          //   .addField('In case you are looking to buy With PP , type ```-buy``` to start the process.','So tell use , how can we help you ??')
          //   // .addField(`${msg.author.username}'s ticket`, `Hello <@${msg.author.id}>, how can I help you today? To make this easier for our staff, please answer the questions below and wait for our support team to get back to you.\n\n1. Describe your issue\n2. When did you purchase\n3. Product you’ve purchased\n4. Order ID\n5. Screenshot of email you received\n6. Amount purchased and non-working creditals\n\nNOTE: If the account you bought was invalid then please send the required proof for a replacement. You can read the required proof here: <#${msg.guild.channels.cache.find(channel => channel.name === "replacements").id}>.\n\n Whenever done with the ticket, type \`-close\` `)
          //   .setTimestamp()
          //   .setFooter(`© 2020 ${bot.user.username}`, bot.user.displayAvatarURL);
            
          // c.send(embed);
          c.send('-buy-bot')
          c.send(`${msg.author} ${supportRole}`).then(m => m.delete()).catch(err => console.log(err));
        }, e => console.log(e))
      // })},
    e => console.log(e)},
  "name": "buy",
  "description": "Open new ticket in the server."
}