const collection = [];

function all() {
  return collection;
}

function add(obj, productId) {
  collection.push(obj);
  collection[productId - 1].id = productId;
  return collection;
}

module.exports = {
  all: all,
  add: add,
};
