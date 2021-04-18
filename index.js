// const discord = require("discord.js");
// const bot = new discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });

// const fs = require("fs");
// const config = require("./config.json");

// bot.baseCommands = new discord.Collection();
// bot.commands = new discord.Collection();

// bot.owners = config.owners;

// fs.readdirSync("./commands").forEach((file) => {
//   if (!file.endsWith(".js")) return;

//   const command = require(`./commands/${file}`);

//   bot.baseCommands.set(file.replace(".js", ""), require(`./commands/${file}`));
//   bot.commands.set(file.replace(".js", ""), command);

//   if (command.aliases && command.aliases.length >= 1)
//     command.aliases.forEach((alias) => bot.commands.set(alias, command));

//   console.log(`Loaded ${file}`);
// });

// bot.login(config.token);

// bot.on("ready", async () =>
//   console.log(
//     `Logged in as ${bot.user.username}. ${
//       bot.users.size
//     } users. ${await bot.generateInvite(8)}`
//   )
// );

// bot.on("message", (message) => {
//   if (!message.content.startsWith(config.prefix)) return;

//   if (message.content == "-done") return;

//   const content = message.content.split(" ");
//   const command = content[0].replace(config.prefix, "");
//   const args = content.slice(1);

//   if (!bot.commands.has(command))
//     return message.channel.send("*Command not found.*");
//   else bot.commands.get(command).run(discord, bot, message, args);
// });

// const app = require("express")();

// app.get("/", (request, response) => {
//   response.send("OK");
// });

// app.listen(3000);

const DDP = require("ddp");
const Login = require("ddp-login");
const loginToken = "ODKkYLF7oducs5INMuCzEBw085sKT1t20Jvb_oyAy2t";

/* Prepare the client */
const DDPClient = new DDP({
  url: "wss://atshop.io/websocket",
});

let accounts = [
  { name: "Limited Items" },
  { name: "Modern Warfare / Warzone Accounts" },
  { name: "WarZone Accounts" },
  { name: "Cold War Accounts" },
  { name: "Blizzard" },
  { name: "VPN" },
  { name: "Porn" },
];

let services = [
  { name: "Instagram Services" },
  { name: "TikTok" },
  { name: "Twitch" },
  { name: "YouTube Services" },
  { name: "Call of Duty Services" },
  { name: "Spotify" },
];

const { addingIdtoObj } = require("./helper/fixingLists");
const { getCategoriesId } = require("./helper/controller");

// product()
//   .then((products) => cleanedListOfproducts(products))
//   .then((list) => console.log(list.length))
//   .catch((e) => console.log(e));
getCategoriesId(DDPClient).then((categoriesId) => {
  accounts = addingIdtoObj(categoriesId, accounts);
  console.log(accounts);

  services = addingIdtoObj(categoriesId, services);
  console.log(services);
});
// .then(console.log);

const productLimitedItemsAccounts = [
  {
    name: "CALL OF DUTY®: MW | Damascus Camo w/ 100+ Warzone Wins",
    price: 25.99,
  },
  {
    name: "CALL OF DUTY®: MW | Damascus Camo w/ 5+ Obsidian Weapons",
    price: 29.99,
  },
];

const activeAccountsList = [
  { list: productLimitedItemsAccounts, name: "Limited Items" },
];
