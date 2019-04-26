const express = require('express');
const routerProducts = express.Router();
const productDB = require('./../db/products.js');

routerProducts
  .route('/')
  .get((req, res) => {
    productDB.emptyMessage();
    res.render('templates/products/index', productDB.retrieveAll());
  })
  .post((req, res) => {
    res.render('templates/products/index', productDB.create(req.body));
  });

routerProducts.route('/new').get((req, res) => {
  res.render('templates/products/new', productDB.retrieveAll());
});

routerProducts
  .route('/:productId')
  .get((req, res) => {
    const id = req.url.slice(1);
    productDB.emptyMessage();
    res.render(`templates/products/${productDB.retrieveOne(id).returnPage}`, productDB.retrieveOne(id));
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    res.render('templates/products/product', productDB.update(req.body, id));
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    res.render('templates/products/index', productDB.remove(id));
  });

routerProducts.route('/:productId/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const id = req.url.substr(1, endIndexSlash);
  res.render('templates/products/edit', productDB.retrieveOne(id));
});

module.exports = routerProducts;
