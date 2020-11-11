const Discord = require("discord.js");

module.exports = {
  "run": async (discord, bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**Unauthorised.**");
  
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
  if(!rMember) return message.reply("**I can't find this user! Mention the user to be able to use this command**");
  let roleName = args.join(" ").slice(22);
  if(!roleName) return message.reply("**Please specify a role! === Put the role name but don't mention it.**");
  // let gRole = message.guild.roles.cache.find(role => role.name == role);
  let gRole = message.guild.roles.cache.find(role => role.name == roleName.replace(' ','')); //.lowerCase()
  if(!gRole) return message.reply("**I can't find this role... try another name or check if you wrote the correct name of the role**");

  if(!rMember.roles.cache.has(gRole.id)) return message.reply("**This member doesn't have this role **");
  await(rMember.roles.remove(gRole.id));
    
   message.channel.send(`**Successfully removed <@${rMember.id}>, \`\`${gRole.name}\`\` role.**`);
  },
  "name": "removerole",
  "description": "Remove a role from a user"
}