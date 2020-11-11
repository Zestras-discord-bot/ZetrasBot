const Discord = require("discord.js");

module.exports = {
    "run": async (discord, client, msg, args) => {
        if (!msg.channel.name.startsWith("ticket-")) return msg.channel.send(new discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("This channel is not a ticket!")
        .setTimestamp()
        .setFooter(`© 2020 ${client.user.username}`, client.user. displayAvatarURL)
        .setColor(0x36393E))

        msg.channel.send("Are you sure you want to delete ticket? \n\n**To confirm type `close`** \n\nTo abort wait 10 seconds and it will abort channel deletion!")
        // .then(m => {
        //     console.log('Waiting!!')
        //     m.channel.awaitMessages(res => res.content == "close" || res.content == "Close", {
        //         maxMatches: 5,
        //         time: 10000,
        //         errors: ["time"]
        //     })
            .then((m) => {
                msg.channel.delete();
            })  
            .catch(() => {
                m.edit("**Aborted channel deletion, command timed out!**")
                .then(abortedMsg => {
                    msg.delete();
                    setTimeout(() => {
                        abortedMsg.delete();
                    }, 5000);
                });
            }); 
        // })
    },
    "name": "close",
    "description": "Close a ticket"
};