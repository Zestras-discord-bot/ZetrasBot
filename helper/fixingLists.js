const addingIdtoObj = (categoriesId, objToModify) => {
  return Object.keys(categoriesId)
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
    });
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
      value: (product[eachId].value / 100) * product[eachId].minQuantity,
      category: product[eachId].category,
    };
    return newStructure;
  });
};

module.exports.addingIdtoObj = addingIdtoObj;
module.exports.erasingHiddenProducts = erasingHiddenProducts;
