module.exports = {
    async run(discord, bot, message, args) {
      if (!bot.owners.includes(message.author.id)) return message.channel.send("*Unauthorised.*");
      
      try {
        let output = eval(args.join(" "));
        if(typeof output !== "string") output = require("util").inspect(output, { "depth": 2 });
        message.channel.send("Success.");
      } catch(error) {
        message.channel.send("Failure.");
        console.error(error);
      };
    },
    "aliases": ["runjs", "evaljs", "execjs"],
    "name": "eval",
    "description": "Evaluate some JavaScript code."
};