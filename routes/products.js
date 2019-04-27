const express = require('express');
const routerProducts = express.Router();
const productDB = require('./../db/products.js');

routerProducts
  .route('/')
  .get((req, res) => {
    res.render('templates/products/index', productDB.retrieveAll());
    productDB.removeMessage();
  })
  .post((req, res) => {
    productDB.create(req.body);
    res.redirect('/products');
  });

routerProducts.route('/new').get((req, res) => {
  res.render('templates/products/new', productDB.retrieveAll());
});

routerProducts
  .route('/:productId')
  .get((req, res) => {
    const id = req.url.slice(1);
    const findProduct = productDB.getIndex(id);
    if (findProduct === -1) {
      return res.redirect('/products');
    }
    // if last message on specific product was for failed edit ...
    // then remove the message when routing to "/products/:id" ...
    // since message was displayed originally on re-route to "/products"
    if (productDB.getMessage(id) === '{ "success": false, "message": "No field values were provided" }') {
      productDB.removeMessage(id);
    }
    res.render(`templates/products/product`, productDB.retrieveOne(id));
    productDB.removeMessage(id);
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    productDB.update(req.body, id);
    const errorMsg = productDB.getMessage(id).indexOf('"success": false') > -1;
    if (errorMsg) {
      res.redirect('/products');
    } else {
      res.redirect(`/products/${id}`);
    }
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    productDB.remove(id);
    res.redirect('/products');
  });

routerProducts.route('/:productId/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const id = req.url.substr(1, endIndexSlash);
  res.render('templates/products/edit', productDB.retrieveOne(id));
});

module.exports = routerProducts;
