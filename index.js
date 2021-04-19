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
  { name: "Limited Items", list: [], fileName: "LimitedItems" },
  {
    name: "Modern Warfare / Warzone Accounts",
    list: [],
    fileName: "ModernWarfare",
  },
  { name: "WarZone Accounts", list: [], fileName: "WarZoneAccounts" },
  { name: "Cold War Accounts", list: [], fileName: "ColdWarAccounts" },
  { name: "Blizzard", list: [], fileName: "Blizzard" },
  { name: "VPN", list: [], fileName: "VPN" },
  { name: "Porn", list: [], fileName: "Porn" },
];

let services = [
  { name: "Instagram Services", list: [], fileName: "Instagram" },
  { name: "TikTok", list: [], fileName: "TikTok" },
  { name: "Twitch", list: [], fileName: "Twitch" },
  { name: "YouTube Services", list: [], fileName: "YouTube" },
  { name: "Call of Duty Services", list: [], fileName: "CallofDutyServices" },
  { name: "Spotify", list: [], fileName: "Spotify" },
];

const {
  addingIdtoObj,
  erasingHiddenProducts,
} = require("./helper/fixingLists");
const { getCategoriesId, getProducts } = require("./helper/controller");
const { writeJsonFile } = require("./helper/createJsonFile");

getCategoriesId(DDPClient) // Gets The categories from API
  .then((categoriesId) => {
    accounts = addingIdtoObj(categoriesId, accounts); //It matched the ID of each category with the ones we hardcoded
    services = addingIdtoObj(categoriesId, services); //It matched the ID of each category with the ones we hardcoded

    getProducts(DDPClient, Login, loginToken) // Gets The Products from API
      .then((products) => erasingHiddenProducts(products)) // Filters the products to erase the hidden one

      .then((list) => {
        console.log(list.length + " Products After Cleaning");
        list.map((eachProduct) => {
          accounts.forEach((eachCategory) => {
            if (eachProduct.category === eachCategory.id) {
              eachCategory.list.push(eachProduct);
            }
          });
          services.forEach((eachCategory) => {
            if (eachProduct.category === eachCategory.id) {
              eachCategory.list.push(eachProduct);
            }
          });
        });
      })

      .then(() => {
        accounts.forEach((each) => {
          each.updateDate = new Date();
          writeJsonFile(each.fileName, each);
        });
        services.forEach((each) => {
          each.updateDate = new Date();
          writeJsonFile(each.fileName, each);
        });
      })

      .catch((e) => console.log(e));
  })
  .catch((e) => console.log(e));
// .then(console.log);
