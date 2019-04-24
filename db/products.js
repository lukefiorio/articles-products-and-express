const collection = [];

function create(obj, productId) {
  collection.push(obj);
  collection[productId - 1].id = productId;
  return collection;
}

function retrieve() {
  return collection;
}

// app.put('/buzzwords', urlParser, (req, res) => {
//   //const findProduct = collection.find((obj) => obj.id === req.body.id);
//   const findProduct = collection.find(function(obj, index) {
//     if (obj.id === req.body.id) {
//       return index;
//     }
//   });

//   if (findProduct > -1) {
//     if (req.body.name) {
//       collection[index].name = req.body.name;
//     }
//     if (req.body.price) {
//       collection[index].price = req.body.price;
//     }
//     if (req.body.inventory) {
//       collection[index].inventory = req.body.inventory;
//     }
//   }

//   const hasKeys = !(req.body.buzzword === undefined || req.body.points === undefined);
//   if (findBuzzword > -1 && hasKeys) {
//     buzzwords[findBuzzword].points = req.body.points;
//     res.send(`{ "success": true }`);
//   } else {
//     res.send(`{ "success": false }`);
//   }
// });

function update(obj) {
  const findProduct = obj.find(function(elem, index) {
    if (elem.id === obj.id) {
      return index;
    }
  });
  console.log(findProduct);

  if (findProduct > -1) {
    if (obj.name) {
      collection[index].name = obj.name;
    }
    if (obj.price) {
      collection[index].price = obj.price;
    }
    if (obj.inventory) {
      collection[index].inventory = obj.inventory;
    }
  }
  return collection;
}

module.exports = {
  create: create,
  retrieve: retrieve,
  update: update,
};
