const DDP = require("ddp");
const Login = require("ddp-login");
const loginToken = "ODKkYLF7oducs5INMuCzEBw085sKT1t20Jvb_oyAy2t";

const { addingIdtoObj, erasingHiddenProducts } = require("./fixingLists");
const { getCategoriesId, getProducts } = require("./controller");
const { writeJsonFile } = require("./createJsonFile");

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

const fetchProcess = () => {
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
          accounts.updateDate = new Date();
          services.updateDate = new Date();

          writeJsonFile("accountsData", { data: accounts });
          writeJsonFile("servicesData", { data: services });
          // accounts.forEach((each) => {
          //   each.updateDate = new Date();
          //   writeJsonFile(each.fileName, each);
          // });
          // services.forEach((each) => {
          //   each.updateDate = new Date();
          //   writeJsonFile(each.fileName, each);
          // });
        })

        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
  // .then(console.log);
};

module.exports.fetchProcess = fetchProcess;
