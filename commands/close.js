const Discord = require("discord.js");
const { relativeTimeRounding } = require("moment");

let confirmDelete = false
let botMessage 

// module.exports = {
//     "run": async (discord, client, msg, args) => {
//         if (!msg.channel.name.startsWith("ticket-")) return msg.channel.send(new discord.MessageEmbed()
//         .setTitle("Error")
//         .setDescription("This channel is not a ticket!")
//         .setTimestamp()
//         .setFooter(`© 2020 ${client.user.username}`, client.user. displayAvatarURL)
//         .setColor(0x36393E))

//         msg.channel.send("Are you sure you want to delete ticket? \n\n**To confirm type `close`** \n\nTo abort wait 10 seconds and it will abort channel deletion!")
//         .then( (m) => {
//             botMessage = m
//             return m},(e) => console.log(e))
//         setTimeout(()=>{
//             const ticketConfirmationMessage = msg.channel.createMessageCollector(x => true);
//             ticketConfirmationMessage.on("collect",(message => {
//                 if (!message.author.bot){
//                     // console.log(message)
//                     const messageContent = message.content.toLowerCase();
//                     ticketConfirmationMessage.stop();
//                     if (messageContent == 'close'){
//                         confirmDelete = true ;
//                         }
//                     }
//                 }));
//             },10000)

//             if (confirmDelete) {
//                 botMessage.channel.delete();
//                 confirmDelete = false
//             }else {
//                 botMessage.edit("**Aborted channel deletion, command timed out!**")
//                 confirmDelete = false
//                 setTimeout(() => {
//                     botMessage.delete();
//                 }, 5000);
//             }
//     },
//     "name": "close",
//     "description": "Close a ticket"
// };

module.exports = {
    "run": async (discord, client, msg, args) => {
        if (!msg.channel.name.startsWith("ticket-")) return msg.channel.send(new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("This channel is not a ticket!")
        .setTimestamp()
        .setFooter(`© 2020 ${client.user.username}`, client.user. displayAvatarURL)
        .setColor(0x36393E))

        msg.channel.send("Are you sure you want to delete ticket? \n\n**To confirm type `close`** \n\nTo abort wait 10 seconds and it will abort channel deletion!")
        .then(m => {
            m.channel.awaitMessages(res => res.content.toLowerCase() == "close", {
                max: 1,
                time: 10000,
                errors: ["time"]
            })
            .then(() => {
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
        })
    },
    "name": "close",
    "description": "Close a ticket"
};