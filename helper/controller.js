// SHOP ID

const shopId = "CYTs2NH5CyGseHqsJ";

// Get Categories ID  PROMISE

const getCategoriesId = (DDPClient) => {
  return new Promise((resolve, reject) =>
    DDPClient.connect((err, reconnected) => {
      if (err) {
        throw err;
      }

      DDPClient.subscribe("shop.categories", [shopId], () => {
        const categories = DDPClient.collections["shop.categories"];
        return resolve(categories);
      });
    })
  );
};

// Get ALL Products  PROMISE
const getProducts = (DDPClient, Login, token) => {
  return new Promise((resolve, reject) => {
    DDPClient.connect((err, reconnected) => {
      if (err) {
        throw err;
      }

      Login.loginWithToken(DDPClient, token, (err, user) => {
        const query = {
          search: "z755JjyysMSeX3zoA",
        };
        const options = {
          limit: 250, // Maximum number of products to fetch at one time. (optional)
        };
        DDPClient.subscribe(
          "admin.shop.products",
          [shopId, null, options],
          () => {
            const products = DDPClient.collections["shop.products"];
            console.log(
              Object.keys(products).length + " Products Fecth from API"
            );
            // console.log(products);
            resolve(products);
          }
        );
      });
    });
  });
};

module.exports.getCategoriesId = getCategoriesId;
module.exports.getProducts = getProducts;
