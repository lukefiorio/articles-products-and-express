const collection = [];

function create(obj, productId) {
  collection.push(obj);
  collection[productId - 1].id = productId;
  return collection;
}

function retrieve() {
  return collection;
}

function update(obj) {
  const productIndex = collection.findIndex((elem) => elem.id === Number(obj.id));

  if (productIndex > -1) {
    if (obj.name) {
      collection[productIndex].name = obj.name;
    }
    if (obj.price) {
      collection[productIndex].price = obj.price;
    }
    if (obj.inventory) {
      collection[productIndex].inventory = obj.inventory;
    }
  }

  return collection;
}

function remove(productId) {
  const productIndex = collection.findIndex((elem) => elem.id === Number(productId));
  if (productIndex > -1) {
    collection.splice(productIndex, 1);
  }
  return collection;
}

module.exports = {
  create: create,
  retrieve: retrieve,
  update: update,
  remove: remove,
};
