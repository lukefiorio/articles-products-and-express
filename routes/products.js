const express = require('express');
const routerProducts = express.Router();
const productDB = require('./../db/products.js');

let productId = 1;

routerProducts
  .route('/')
  .get((req, res) => {
    res.send(`${JSON.stringify(productDB.retrieve())}`);
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
    console.log(req.url);
    const hasKeys = req.body.id;
    if (hasKeys) {
      productDB.update(req.body.id);
      res.send(`{ "success": true}`);
    } else if (!hasKeys) {
      res.send(`{ "success": false}`);
    }
  });

module.exports = routerProducts;
