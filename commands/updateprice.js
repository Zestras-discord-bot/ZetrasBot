module.exports = {
  run: async (discord, bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**Unauthorized.**");

    const { fetchProcess } = require("../helper/connectionWithDDP");

    fetchProcess();

    message.channel
      .send("I successfully updated the prices to the latest available.")
      .then((m) => {
        setTimeout(() => {
          m.delete();
        }, 10000);
      });

    setTimeout(() => {
      message.delete().catch((error) => {
        console.log("Error start here ");
        console.log(error);
      });
    }, 3000);
  },
  name: "updatePrice",
  aliases: ["update"],
  description: "Update the prices shown on the buy process",
};
