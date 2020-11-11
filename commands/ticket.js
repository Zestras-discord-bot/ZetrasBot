const discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");


module.exports ={
    "run": async (discord, bot, msg, args) =>{
        msg.delete()
 
        let TicketEmbed = new discord.MessageEmbed()

        .setTitle("Error")
        .setColor("#FB7052")
        .setAuthor("Ticket Bot")
        .setTitle("**Support needed?**")
        .setDescription(" Just follow the instructions bellow")
        .addField("**➥ If you want to create the ticket please react ⚙️**","A support member will help you as soon as possible!" )
        .setFooter(`Your friendly ticket bot!!`)

        msg.channel.send(TicketEmbed).then(async msg => {
            msg.react("⚙️")
    })
    }
} 

// module.exports.help = {
//     name: "ticketsetup"
// }
 