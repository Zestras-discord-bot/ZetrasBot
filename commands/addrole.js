const Discord = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") && message.author.id !== "460892852889845780") return message.reply("**Unauthorised.**");
    
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.find(member => member.id == args[0]);
    if(!rMember) return message.reply("**I can't find this user! Mention the user to be able to use this command**");
    let roleName = args.join(" ").slice(23);
    if(!roleName) return message.reply("**Please specify a role! (Put the role name but don't mention it)**");
    let gRole = message.guild.roles.cache.find(role => role.name == roleName); //.lowerCase()
    // console.log(message.guild.roles.cache)
    // console.log(roleName)

    if(!gRole) return message.reply("**I can't find this role. Try another name or check if you wrote the correct name of the role**");

    if(rMember.roles.cache.has(gRole.id)) return message.reply("**This member already has this role.**");
    rMember.roles.add(gRole.id).catch(err => { return message.channel.send("Bot has no perms") });

    message.channel.send(`**Successfully added <@${rMember.id}>, \`\`${gRole.name}\`\` role.**`);
    message.react('✅')
  },
  "name": "addrole",
  "description": "Add a role to someone"
}