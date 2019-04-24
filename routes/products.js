const express = require('express');
const routerProducts = express.Router();
const productDB = require('./../db/products.js');

let productId = 1;

routerProducts
  .route('/')
  .get((req, res) => {
    const productCollection = {
      products: productDB.retrieve(),
    };
    res.render('main', productCollection);
    //res.send(`${JSON.stringify(productDB.retrieve())}`);
  })
  .post((req, res) => {
    const hasKeys = req.body.name && req.body.price && req.body.inventory;
    if (hasKeys) {
      productDB.create(req.body, productId);
      productId++;
      res.send(`{ "success": true}`);
    } else if (!hasKeys) {
      res.send(`{ "success": false}`);
    }
  })
  .put((req, res) => {
    const hasKeys = req.body.id;
    if (hasKeys) {
      productDB.update(req.body);
      res.send(`{ "success": true}`);
    } else if (!hasKeys) {
      res.send(`{ "success": false}`);
    }
  })
  .delete((req, res) => {
    const hasKeys = req.body.id;
    if (hasKeys) {
      productDB.remove(req.body.id);
      res.send(`{ "success": true}`);
    } else if (!hasKeys) {
      res.send(`{ "success": false}`);
    }
  });

routerProducts.route('/:productId').get((req, res) => {
  const productCollection = {
    products: productDB.retrieve(),
  };
  console.log(productCollection[0].products);
  res.send(`Product: ${productCollection[productId - 1]}`);
});

module.exports = routerProducts;
