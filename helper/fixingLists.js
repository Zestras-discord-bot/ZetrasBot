const { ppPrice } = require("../config.json");

const addingIdtoObj = (categoriesId, objToModify) => {
  let newobjet = [...objToModify];
  newobjet.forEach((each) => (each.list = []));

  return [
    ...Object.keys(categoriesId)
      .map((eachKey) => {
        let newObj;
        objToModify.map((eachAccountType) => {
          if (
            eachAccountType.name.trim() === categoriesId[eachKey].title.trim()
          ) {
            newObj = { ...eachAccountType, id: eachKey };
          }
        });
        return newObj;
      })
      .filter((each) => {
        if (each !== undefined) return each;
      }),
  ];
};

const erasingHiddenProducts = (products) => {
  const noHiddenId = Object.keys(products).filter((eachKey) => {
    if (!products[eachKey].hidden) {
      return products[eachKey];
    }
  });

  return ordenedListOfproducts(products, noHiddenId);
};

const ordenedListOfproducts = (product, noHiddenId) => {
  return noHiddenId.map((eachId) => {
    const newStructure = {
      id: product[eachId]._id,
      name: product[eachId].name,
      minQuantity: product[eachId].minQuantity,
      price:
        (product[eachId].value / 100) * product[eachId].minQuantity * ppPrice,
      category: product[eachId].category,
      stock: product[eachId].stockCount,
    };

    return newStructure;
  });
};

const checkForExceptions = (exceptions, product) => {
  let newProduct = { ...product };

  exceptions.forEach((eachExceptions) => {
    if (eachExceptions.name === product.name) {
      newProduct.price = eachExceptions.price;
    }
  });

  return newProduct;
};

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

module.exports.addingIdtoObj = addingIdtoObj;
module.exports.erasingHiddenProducts = erasingHiddenProducts;
module.exports.sliceIntoChunks = sliceIntoChunks;
module.exports.checkForExceptions = checkForExceptions;
