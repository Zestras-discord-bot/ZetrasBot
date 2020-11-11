module.exports = {
    async "run" (discord, bot, message, args) {
        message.delete().catch(error => {console.log('Error start here ');console.log(error)});
      
        let commands = bot.baseCommands.map(command => `**${command.name}** : *${command.description}*${command.aliases ? `\nAliases: **${command.aliases.join(", ")}**` : ""}\n`);

        message.channel.send(new discord.MessageEmbed()
            .setTitle("List of Commands:")
            .setDescription(commands)
            .setColor(0x36393E)).catch(error => {
                commands = commands.join("\n");
                while(commands.includes("*")) commands = commands.replace("*", "");
                console.log(`Commands:\n\n${commands}`);
        });
    },
    "name": "help",
    "aliases": ["halp", "cmds", "commands"],
    "description": "Find out how to use the bot."
};