const productCollection = {
  products: [],
};
let productId = 1;

function create(obj) {
  const hasKeys = obj.name && obj.price && obj.inventory;

  if (hasKeys) {
    obj.id = productId;
    productCollection.products.push(obj);
    productId++;
    return `{ "success": true}`;
  } else if (!hasKeys) {
    return `{ "success": false}`;
  }
}

function retrieveAll() {
  return productCollection;
}

function retrieveOne(productId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(productId));
  if (productIndex === -1) {
    return `{ "success": false. Product ID not found }`;
  }

  if (productIndex > -1) {
    return productCollection.products[productIndex];
  }
}

function update(obj, urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    return `{ "success": false. Product ID not found }`;
  }

  // check that at least one product property is provided
  const hasKeys = obj.name || obj.price || obj.inventory;
  if (!hasKeys) {
    return `{ "success": false. Provide field value(s) to modify. }`;
  }

  if (hasKeys && productIndex > -1) {
    // apply modified values
    if (obj.name) {
      productCollection.products[productIndex].name = obj.name;
    }
    if (obj.price) {
      productCollection.products[productIndex].price = obj.price;
    }
    if (obj.inventory) {
      productCollection.products[productIndex].inventory = obj.inventory;
    }
    return `{ "success": true}`;
  }
}

function remove(urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    return `{ "success": false. Product ID not found }`;
  }

  if (productIndex > -1) {
    productCollection.products.splice(productIndex, 1);
    return `{ "success": true}`;
  }
}

module.exports = {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
};
