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
    res.render('templates/products/index', productCollection);
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
  const id = req.url.slice(1);
  res.send(`Product: ${JSON.stringify(productDB.retrieveOne(id))}`);
});

routerProducts.route('/:productId/edit').get((req, res) => {
  const endIndex = req.url.indexOf('/', 1) - 1;
  const id = req.url.substr(1, endIndex);
  res.send(`Product: ${JSON.stringify(productDB.retrieveOne(id))}`);
});

module.exports = routerProducts;
