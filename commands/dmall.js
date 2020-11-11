module.exports = {
    async "run" (discord, bot, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("*Missing permissions.*");
        if(!args[0]) return message.channel.send("*Please provide a message to send.*");
        
        let guild = message.guild.id ;
        let members = bot.guilds.cache.get(guild)
        console.log(guild);
        console.log(members);
        
        // message.guild.members.cache.each(member => {
        //     console.log(member)
        //     member.send(args.join(" "))});

        // message.guild.members.cache.each(member => {if (!member.user.bot){member.send(args.join(" "))}});
      
        // message.channel.send("**Sending message, trust me.**");
    },
    "name": "dm",
    "aliases": ["dmall", "massdm", "sendall"],
    "description": "NOTE: Under Development | Message all members in the server with a given piece of text."
}; 