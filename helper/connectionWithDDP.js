const DDP = require("ddp");
const Login = require("ddp-login");
const { loginToken } = require("../config.json");

const {
  addingIdtoObj,
  erasingHiddenProducts,
  checkForExceptions,
} = require("./fixingLists");
const { getCategoriesId, getProducts } = require("./controller");
const { writeJsonFile } = require("./createJsonFile");

/* Prepare the client */
const DDPClient = new DDP({
  url: "wss://atshop.io/websocket",
});

const fetchProcess = () => {
  getCategoriesId(DDPClient) // Gets The categories from API
    .then((categoriesId) => {
      const { freshAccounts, freshServices } = require("../config.json");

      let accounts = [...freshAccounts];
      let services = [...freshServices];

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
                if (eachCategory.exceptions) {
                  eachProduct = checkForExceptions(
                    eachCategory.exceptions,
                    eachProduct
                  );
                }

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
        })

        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
  // .then(console.log);
};

module.exports.fetchProcess = fetchProcess;
