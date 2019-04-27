const productCollection = {
  products: [],
  message: '',
  showMessage: false,
};
let productId = 1;

function create(obj) {
  const hasKeys = obj.name && obj.price && obj.inventory;

  if (hasKeys) {
    obj.id = productId;
    productCollection.products.push(obj);
    productId++;
    productCollection.message = '{ "success": true}';
    productCollection.showMessage = true;
  } else {
    productCollection.message = '{ "success": false}';
    productCollection.showMessage = true;
  }
}

function retrieveAll() {
  return productCollection;
}

function retrieveOne(productId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(productId));
  if (productIndex === -1) {
    productCollection.message = '{ "success": false, "message": "Product ID not found" }';
    productCollection.showMessage = true;
    return productCollection;
  }

  return productCollection.products[productIndex];
}

function update(obj, urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    productCollection.message = '{ "success": false, "message": "Product ID not found" }';
    productCollection.showMessage = true;
    return;
  }

  let msg = '';
  const hasKeys = obj.name || obj.price || obj.inventory;
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
  // apply these values to individual product to handle redirect route = '/product/:id'
  productCollection.products[productIndex].message = msg;
  productCollection.products[productIndex].showMessage = true;

  // apply these values to colletion to handle redirect route = '/product'
  productCollection.message = msg;
  productCollection.showMessage = true;
}

function remove(urlId) {
  // check that productID is in collection.
  const productIndex = productCollection.products.findIndex((elem) => elem.id === Number(urlId));
  if (productIndex === -1) {
    productCollection.message = '{ "success": false, "message": "Product ID not found" }';
    productCollection.showMessage = true;
    return;
  }

  productCollection.products.splice(productIndex, 1);
  productCollection.message = '{ "success": true}';
  productCollection.showMessage = true;
}

function removeMessage(id = 0) {
  productCollection.showMessage = false;
  const index = productCollection.products.findIndex((elem) => elem.id === Number(id));
  if (id !== 0 && index > -1) {
    productCollection.products[index].showMessage = false;
  }
}

function getMessage(id = 0) {
  const index = productCollection.products.findIndex((elem) => elem.id === Number(id));
  if (id !== 0 && index > -1) {
    return productCollection.products[index].message;
  }
  return productCollection.message;
}

function getIndex(id) {
  const index = productCollection.products.findIndex((elem) => elem.id === Number(id));
  if (index === -1) {
    productCollection.message = '{ "success": false, "message": "Product ID not found" }';
    productCollection.showMessage = true;
  }

  return index;
}

module.exports = {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
  removeMessage,
  getMessage,
  getIndex,
};
