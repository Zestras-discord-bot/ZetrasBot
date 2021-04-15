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

/* Connect to the server */
DDPClient.connect((err, reconnected) => {
  if (err) {
    throw err;
  }
  // Successfully connected!
  const shopId = "CYTs2NH5CyGseHqsJ";
  const orderId = "hAqNWwcruD5NXA4Yr";

  Login.loginWithToken(DDPClient, loginToken, (err, user) => {
    // console.log("You are now logged in", user);

    const options = {
      limit: 5000, // Maximum number of products to fetch at one time. (optional)
    };
    DDPClient.subscribe("admin.shop.products", [shopId, null, options], () => {
      let products = DDPClient.collections["shop.products"]; // Array of product objects.

      const keys = Object.keys(products);

      products = keys.map((eachKey) => {
        if (products[eachKey].hidden) return;

        return products[eachKey];
      });

      const filteredListOfproducts = products.filter((product) => {
        if (product) {
          return product;
        }
      });

      const ordenedListOfproducts = (productsList) => {
        return productsList.map((eachProduct) => {
          const newStructure = {
            id: eachProduct._id,
            name: eachProduct.name,
            minQuantity: eachProduct.minQuantity,
            value: eachProduct.value,
            category: eachProduct.category,
          };
          return newStructure;
        });
      };

      console.log(ordenedListOfproducts(filteredListOfproducts));
    });
  });
});
