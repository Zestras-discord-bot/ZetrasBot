const Discord = require('discord.js');
// const ms = require("ms");
const fs = require('fs');

let numTicket;

module.exports = {
  run: async (discord, bot, msg) => {
    let supportRole = msg.guild.roles.cache.find(
      (r) => r.name == 'Support Team'
    );
    if (!supportRole)
      return msg.channel.send(
        'There is no `Support Team` role! Please tell an admin to create this role!'
      );
    if (msg.channel.id != '776817366574432276')
      return msg.channel.send(
        `Please use the ${msg.guild.channels.cache.find(
          (c) => c.id == '776817366574432276'
        )} channel.`
      );
    let user = msg.author;
    // if (!user.bot) return msg.channel.send("Incorrect method , you will need to react to the above embed message to create a ticket");;
    if (msg.guild.channels.cache.find((c) => c.topic == user.id))
      return msg.channel.send(
        new discord.MessageEmbed()
          .setTitle('Error')
          .setDescription('You already have an opened ticket!')
          .setTimestamp()
          .setFooter(`© 2020 ${bot.user.username}`, bot.user.displayAvatarURL)
          .setColor(0xff0000)
      );
    msg.guild.channels
      .create(`ticket-${user.username}`, {
        permissionOverwrites: [
          {
            id: msg.guild.roles.cache.find((r) => r.name == '@everyone').id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: msg.author.id,
            allow: ['VIEW_CHANNEL'],
          },
          {
            id: supportRole.id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
      })
      .then((c) => {
        msg.delete();
        return c;
      })
      .then(
        (c) =>
          c.setParent(
            msg.guild.channels.cache.find(
              (channel) => channel.id == 776818807192682527
            ).id
          ),
        (e) => console.log(e)
      ) //channel.type == "category" &&
      .then((c) => {
        c.overwritePermissions([
          {
            id: msg.guild.roles.cache.find((r) => r.name == '@everyone').id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: msg.author.id,
            allow: ['VIEW_CHANNEL'],
          },
          {
            id: supportRole.id,
            allow: ['VIEW_CHANNEL'],
          },
        ]);
        return c;
      })
      .then(
        (c) => {
          msg.channel
            .send(
              new discord.MessageEmbed()
                .setTitle('Ticket created!')
                .setDescription(`You can find it here: ${c}.`)
                .setTimestamp()
                .setFooter(
                  `© 2020 ${bot.user.username}`,
                  bot.user.displayAvatarURL
                )
                .setColor(0x00ff00)
            )
            .then((message) => setTimeout(() => message.delete(), 20000));

          c.send('-buy-bot');
          c.send(`${msg.author} ${supportRole}`)
            .then((m) => m.delete())
            .catch((err) => console.log(err));
        },
        (e) => console.log(e)
      );
    // })},
    (e) => console.log(e);
  },
  name: 'buy',
  description: 'Open new ticket in the server.',
};
