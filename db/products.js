const productCollection = {
  products: [],
  message: '',
};
let productId = 1;

function create(obj) {
  const hasKeys = obj.name && obj.price && obj.inventory;

  if (hasKeys) {
    obj.id = productId;
    productCollection.products.push(obj);
    productId++;
    productCollection.message = '{ "success": true}';
    return productCollection;
  } else {
    productCollection.message = '{ "success": false}';
    return productCollection;
  }
}

function retrieveAll() {
  return productCollection;
}

function retrieveOne(productId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(productId));
  if (productIndex === -1) {
    return '{ "success": false, "message": "Product ID not found" }';
  }

  if (productIndex > -1) {
    return productCollection.products[productIndex];
  }
}

function update(obj, urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    productCollection.message = '{ "success": false, "message": "Product ID not found" }';
    return productCollection;
  }

  let msg = '';
  const hasKeys = obj.name || obj.price || obj.inventory;
  // check that at least one product property is provided
  if (!hasKeys) {
    msg = '{ "success": false, "message": "No field values were provided" }';
  } else {
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
    msg = '{ "success": true }';
  }

  // apply values individually so they don't map back to original object
  const productToModify = {
    name: productCollection.products[productIndex].name,
    price: productCollection.products[productIndex].price,
    inventory: productCollection.products[productIndex].inventory,
    id: productCollection.products[productIndex].id,
    message: msg,
  };
  return productToModify;
}

function remove(urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    return '{ "success": false. Product ID not found }';
  }

  productCollection.products.splice(productIndex, 1);
  return '{ "success": true}';
}

function emptyMessage() {
  return (productCollection.message = '');
}

module.exports = {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
  emptyMessage,
};
