// PP EMAIL

const ppEmail = "sohaibmezlay@gmail.com";

module.exports = {
  async run(discord, bot, message, args) {
    // message.reply("Paypal is limited, please try again later");

    if (!message.channel.name.includes("ticket")) {
      //message.channel.name.includes("ticket")
      return message
        .reply(
          "This command can be only called inside of a ticket"
          // "PP Payments are closed, Sorry but you will have to wait till we get a new PP account"
        )
        .then(
          //This is only if the PP is limited
          (message) => {
            setTimeout(() => {
              message.delete();
            }, 5000);
          },
          (e) => console.log(e)
        );
    }

    let ticket = message.channel;

    const activeAccountsList = require("../helper/jsonData/accountsData.json")
      .data;
    const activeServicesList = require("../helper/jsonData/servicesData.json")
      .data;

    message
      .reply(
        new discord.MessageEmbed()
          .setTitle(`Let's Get Started!`)
          .setDescription(
            "*What payment method would you like to use to pay?*\n\n**[1]** *PayPal*\n\n**[2]** *Bitcoin*\n\n**NOTE:** Type `-close` to close the ticket at any time."
          )
          .setColor(0x36393e)
      )
      .then(
        setTimeout(() => {
          message.delete();
        }, 1500),
        (e) => console.log(e)
      );
    const paymentMethodCollector = ticket.createMessageCollector((x) => true);

    paymentMethodCollector.on("collect", (message) => {
      const paymentMethodContent = message.content.toLowerCase();

      if (paymentMethodContent === "bitcoin" || paymentMethodContent === "2") {
        ticket.send(
          "*If you want to purchase using Bitcoin, then please buy using our website* **http://zestras.net/**\n\n**NOTE:** The ticket is going to get closed in 30s. **(create a new ticket if you want to purchase using PayPal)**"
        );
        paymentMethodCollector.stop();
        setTimeout(() => ticket.delete(), 30000);
        return;
      } else if (
        paymentMethodContent === "paypal" ||
        paymentMethodContent === "1"
      ) {
        paymentMethodCollector.stop();

        message.channel.send(
          `*You have selected **PayPal** as your payment method. <:paypal:761297958272237629>\n\nPlease **note** that **PayPal** prices are* **20%** higher than **Bitcoin** prices on our shop.\n\nAlso please **note** that **Zestras only** accepts **PayPal** if you have a *Friends & Family* payment option. Some countries that **DOESN'T** have a *Friends & Family* payment option are: *Brazil, China, India, Japan, Jamaica, Aruba*. If your country is in this list, then you **cannot** buy! **(please double check if you're able to send payments as Friends & Family before continuing)**\n\nLastly, **please** make sure that you **accept** these **Terms of service** before you send any money: **https://zestras.net/terms**\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
        );

        message.channel.send(
          new discord.MessageEmbed()
            .setTitle("Terms of Service")
            .setDescription(
              "*Have you read and agreed to [these](https://zestrasonline.atshop.io/terms) terms of services?*\n\n**[1]** *Yes*\n\n**[2]** *No*\n\n**NOTE:** Type `-close` to close the ticket at any time."
            )
            .setColor(0x36393e)
        );

        const acceptedTermsCollector = ticket.createMessageCollector(
          (x) => true
        );

        acceptedTermsCollector.on("collect", (message) => {
          const acceptedTermsContent = message.content.toLowerCase();

          if (acceptedTermsContent === "no" || acceptedTermsContent === "2") {
            acceptedTermsCollector.stop();
            message.channel.send(
              "*You need to accept the terms of services in order to purchase.*"
            );
            message.channel.send(
              new discord.MessageEmbed()
                .setTitle("Terms of Service")
                .setDescription(
                  "*Have you read and agreed to [these](https://zestrasonline.atshop.io/terms) terms of services?*\n\n**[1]** *Yes*\n\n**[2]** *No*\n\n**NOTE:** Type `-close` to close the ticket at any time."
                )
                .setColor(0x36393e)
            );
            const acceptedTermsSecondTimeCollector = ticket.createMessageCollector(
              (x) => true
            );
            acceptedTermsSecondTimeCollector.on("collect", (message) => {
              const acceptedTermsContentAgain = message.content.toLowerCase();
              if (
                acceptedTermsContentAgain === "no" ||
                (acceptedTermsContentAgain === "2" && !message.author.bot)
              ) {
                return (
                  ticket.delete() && acceptedTermsSecondTimeCollector.stop()
                );
              } else if (
                (!message.author.bot && acceptedTermsContentAgain === "yes") ||
                acceptedTermsContentAgain === "1"
              ) {
                acceptedTermsSecondTimeCollector.stop();
                message.channel
                  .send(`OK!! let's start over`)
                  .then(message.channel.send("-buy-bot"));
              }
            });
          } else if (
            acceptedTermsContent === "yes" ||
            acceptedTermsContent === "1"
          ) {
            acceptedTermsCollector.stop();

            message.channel.send(
              new discord.MessageEmbed()
                .setTitle("What are you looking for ??")
                .setDescription(
                  "*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**\n\n**[1]** *Accounts*\n\n**[2]** *Services*\n\n**NOTE:** Type `-close` to close the ticket at any time."
                )
                .setColor(0x36393e)
            );

            const whatLookingForCollector = ticket.createMessageCollector(
              (x) => true
            );

            whatLookingForCollector.on("collect", (message) => {
              let collectorContent = message.content.toLowerCase();

              if (collectorContent === "service" || collectorContent === "2") {
                whatLookingForCollector.stop();
                let activeServices = activeServicesList.map(
                  (service, index) => {
                    return `**[${index + 1}]** *${service.name}*`;
                  }
                );
                let description = `*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**\n\n${activeServices.join(
                  "\n\n"
                )}`;
                message.channel.send(
                  new discord.MessageEmbed()
                    .setTitle("Which Service ?")
                    .setDescription(
                      description +
                        "\n\n**NOTE:** Type `-close` to close the ticket at any time."
                    )
                    .setColor(0x36393e)
                );
                const whichServiceCollector = ticket.createMessageCollector(
                  (x) => true
                );
                whichServiceCollector.on("collect", (message) => {
                  collectorContent = parseInt(message.content.toLowerCase());

                  if (collectorContent.toString() === "NaN") return;

                  let selectedService =
                    activeServicesList[parseInt(collectorContent) - 1];

                  if (
                    collectorContent === selectedService.name.toLowerCase() ||
                    collectorContent - 1 ===
                      activeServicesList.indexOf(
                        activeServicesList[parseInt(collectorContent) - 1]
                      )
                  ) {
                    whichServiceCollector.stop();

                    let productsItems = selectedService.list.map(
                      (product, index) => {
                        return `**[${
                          index + 1
                        }]** *${product.name.trim()}* [**$${product.price.toFixed(
                          2
                        )}**]`;
                      }
                    );

                    if (productsItems.length < 8) {
                      message.channel.send(
                        `*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**\n\n*Select the product that you would like to buy:*\n\n${productsItems.join(
                          "\n"
                        )}\n\n*Please check what stock is available on the shop before picking a product.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                      );
                    } else if (productsItems.length > 7) {
                      const {
                        sliceIntoChunks,
                      } = require("../helper/fixingLists");

                      productsItems = sliceIntoChunks(productsItems, 8);

                      message.channel.send(
                        "*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**"
                      );
                      message.channel.send(
                        "*Please check what stock is available on the shop before picking a product.*"
                      );

                      productsItems.forEach((productsItems) => {
                        message.channel.send(
                          `\n\n${productsItems.join("\n")}\n\n`
                        );
                      });
                      message.channel.send(
                        "**NOTE:** Type `-close` to close the ticket at any time."
                      );
                    }

                    const productCollector = ticket.createMessageCollector(
                      (x) => true
                    );
                    productCollector.on("collect", (message) => {
                      const productContent = message.content.toLowerCase();
                      const number = parseInt(productContent);

                      if (number.toString() === "NaN") return;
                      else if (
                        number < 1 ||
                        number > selectedService.list.length
                      )
                        return message.channel.send(
                          `*Please send a valid number.* **${number}** *is not a valid number.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                        );
                      else {
                        productCollector.stop();
                        const product = selectedService.list[number - 1];

                        message.channel.send(
                          `Send:**$${product.price.toFixed(
                            2
                          )}** *to* **${ppEmail}** as **Friends and Family**. \n\n **DO NOT ADD A NOTE TO THE PAYMENT | IF YOU DO WE WILL NOT SEND OUT THE PRODUCT!**. \n\n **Remember** to also **change** the **receiver currency** to: **USD ($)** before sending the money:\n https://imgur.com/a/e55EV2Y \nhttps://imgur.com/a/0P3TVYY \n\n*Once you have sent the money, **provide** screenshot proof that you have sent the money as **Friends and Family** to the correct **PayPal** email by showing the receipt. Receipt **MUST** display the Email you sent the money to and Fee for the Friends & Family payment option (**If you do not provide this proof then we wont send out your product**).  Once you have done that, type* **-done** *.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                        );

                        const doneCollector = ticket.createMessageCollector(
                          (x) => true
                        );

                        doneCollector.on("collect", (message) => {
                          const doneContent = message.content.toLowerCase();

                          if (doneContent === "-done") {
                            doneCollector.stop();
                            message.channel.send(
                              "*Thank you for your order!*\n**Zestras** will review this ticket soon and fulfill your order. This can take up to **24 hours** if he is offline. If you haven't received your order within 24 hours, then you'll be automatically refunded.\n\n***NOTE**: Do **NOT** delete this ticket."
                            );
                          }
                        });
                      }
                    });
                  }
                });
              } else if (
                collectorContent === "account" ||
                collectorContent === "1"
              ) {
                whatLookingForCollector.stop();
                let activeAccounts = activeAccountsList.map(
                  (account, index) => {
                    return `**[${index + 1}]** *${account.name}*`;
                  }
                );
                let description = `*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**\n\n${activeAccounts.join(
                  "\n\n"
                )}`;
                message.channel.send(
                  new discord.MessageEmbed()
                    .setTitle("Which Account ?")
                    .setDescription(
                      description +
                        "\n\n**NOTE:** Type `-close` to close the ticket at any time."
                    )
                    .setColor(0x36393e)
                );
                const whichAccountCollector = ticket.createMessageCollector(
                  (x) => true
                );
                whichAccountCollector.on("collect", (message) => {
                  collectorContent = message.content.toLowerCase();

                  collectorContent = parseInt(message.content.toLowerCase());

                  if (collectorContent.toString() === "NaN") return;

                  let selectedAccount =
                    activeAccountsList[parseInt(collectorContent) - 1];

                  if (
                    collectorContent === selectedAccount.name.toLowerCase() ||
                    collectorContent - 1 ===
                      activeAccountsList.indexOf(
                        activeAccountsList[parseInt(collectorContent) - 1]
                      )
                  ) {
                    whichAccountCollector.stop();

                    let productsItems = selectedAccount.list.map(
                      (product, index) => {
                        return `**[${
                          index + 1
                        }]** *${product.name.trim()}* [**$${product.price.toFixed(
                          2
                        )}**] | [STOCK: **${product.stock}**]`;
                      }
                    );
                    if (productsItems.length < 8) {
                      message.channel.send(
                        `*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**\n\n*Select the product that you would like to buy:*\n\n${productsItems.join(
                          "\n"
                        )}\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                      );
                    } else if (productsItems.length > 7) {
                      const {
                        sliceIntoChunks,
                      } = require("../helper/fixingLists");

                      productsItems = sliceIntoChunks(productsItems, 8);

                      message.channel.send(
                        "*Please make sure to check the store to get a full list of all our products here:* **https://zestras.net/**"
                      );

                      productsItems.forEach((productsItems) => {
                        message.channel.send(
                          `\n\n${productsItems.join("\n")}\n\n`
                        );
                      });
                      message.channel.send(
                        "**NOTE:** Type `-close` to close the ticket at any time."
                      );
                    }

                    const productCollector = ticket.createMessageCollector(
                      (x) => true
                    );
                    productCollector.on("collect", (message) => {
                      const productContent = message.content.toLowerCase();
                      const number = parseInt(productContent);

                      if (number.toString() === "NaN") return;
                      else if (
                        number < 1 ||
                        number > selectedAccount.list.length
                      )
                        return message.channel.send(
                          `*Please send a valid number.* **${number}** *is not a valid number.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                        );
                      else if (selectedAccount.list[number - 1].stock < 1) {
                        return message.channel
                          .send(
                            `Sorry but *${selectedAccount.list[
                              number - 1
                            ].name.trim()}* are **out of stock**, choose another one.`
                          )
                          .then((m) => setTimeout(() => m.delete(), 5000));
                      } else {
                        productCollector.stop();
                        const product = selectedAccount.list[number - 1];

                        message.channel.send(
                          `*How Many **${product.name}** would you like?*\n\n*Type any number between **1 - 999** to choose the amount of accounts you want to purchase.* \n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                        );

                        const howManyCollector = ticket.createMessageCollector(
                          (x) => true
                        );

                        howManyCollector.on("collect", (message) => {
                          const howManyContent = parseInt(message.content);

                          if (howManyContent.toString() === "NaN") return;
                          else if (howManyContent < 1 || howManyContent > 999)
                            return message.channel.send(
                              `*Please send a valid number.* **${number}** *is not a valid number.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                            );
                          else {
                            howManyCollector.stop();

                            message.channel.send(
                              `*Send*  **$${(
                                product.price * howManyContent
                              ).toFixed(
                                2
                              )}** *to* **${ppEmail}** as **Friends and Family**. \n\n **DO NOT ADD A NOTE TO THE PAYMENT | IF YOU DO WE WILL NOT SEND OUT THE PRODUCT!**. \n\n **Remember** to also **change** the **receiver currency** to: **USD ($)** before sending the money:\n https://imgur.com/a/e55EV2Y \nhttps://imgur.com/a/0P3TVYY \n\n*Once you have sent the money, **provide** screenshot proof that you have sent the money as **Friends and Family** to the correct **PayPal** email by showing the receipt. Receipt **MUST** display the Email you sent the money to and Fee for the Friends & Family payment option (**If you do not provide this proof then we wont send out your product**).  Once you have done that, type* **-done** *.*\n\n**NOTE:** Type \`-close\` to close the ticket at any time.`
                            );

                            const doneCollector = ticket.createMessageCollector(
                              (x) => true
                            );

                            doneCollector.on("collect", (message) => {
                              const doneContent = message.content.toLowerCase();

                              if (doneContent === "-done") {
                                doneCollector.stop();
                                message.channel.send(
                                  "*Thank you for your order!*\n**Zestras** will review this ticket soon and fulfill your order. This can take up to **24 hours** if he is offline. If you haven't received your order within 24 hours, then you'll be automatically refunded.\n\n***NOTE**: Do **NOT** delete this ticket."
                                );
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          } else return;
        });
      } else return;
    });
  },
  name: "buy-bot",
  aliases: ["purchase"],
  description: "Handling the bot for buying items",
};
