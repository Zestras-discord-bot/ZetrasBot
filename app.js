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

    DDPClient.subscribe("admin.shop.products", [shopId], () => {
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
