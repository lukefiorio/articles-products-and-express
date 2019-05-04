const express = require('express');
const routerProducts = express.Router();
const knex = require('../db');
let msg = '';

routerProducts
  .route('/')
  .get((req, res) => {
    knex
      .select()
      .table('products')
      .orderBy('id')
      .then((result) => {
        let resultObj = { rows: result };
        if (msg !== '') {
          resultObj.message = msg;
          msg = '';
        }
        return res.render('templates/products/index', resultObj);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    const reqName = req.body.name;
    const reqInventory = parseFloat(req.body.inventory);
    let reqPrice = req.body.price;
    if (reqPrice.charAt(0) === '$') {
      reqPrice = reqPrice.substr(1);
    }
    reqPrice = parseFloat(reqPrice);
    const hasKeys = reqName && reqInventory && reqPrice;
    if (!hasKeys) {
      msg = 'Must post all product fields';
      return res.redirect('/products/new');
    }
    knex('products')
      .insert({ name: reqName, inventory: reqInventory, price: reqPrice })
      .then((result) => {
        msg = 'Product succesfully added';
        res.redirect('/products');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

routerProducts.route('/new').get((req, res) => {
  let resultObj = {};
  if (msg !== '') {
    resultObj.message = msg;
    msg = '';
  }
  res.render('templates/products/new', resultObj);
});

routerProducts
  .route('/:productId')
  .get((req, res) => {
    const id = req.url.slice(1);
    knex
      .select()
      .table('products')
      .where('id', id)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Product not found';
          return res.redirect('/products');
        }
        let resultObj = result[0];
        if (msg !== '') {
          resultObj.message = msg;
          msg = '';
        }
        res.render('templates/products/product', resultObj);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    knex
      .select()
      .table('products')
      .where('id', id)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Product not found';
          return res.redirect('/products');
        }
        let updateObj = {};
        if (req.body.name) {
          updateObj.name = req.body.name;
        }
        if (req.body.inventory) {
          updateObj.inventory = parseFloat(req.body.inventory);
        }
        if (req.body.price) {
          if (req.body.price.charAt(0) === '$') {
            updateObj.price = parseFloat(req.body.price.substr(1));
          } else {
            updateObj.price = parseFloat(req.body.price);
          }
        }

        if (Object.keys(updateObj).length === 0) {
          msg = 'No field values were provided';
          return res.redirect(`/products/${id}/edit`);
        }

        knex('products')
          .update(updateObj)
          .where('id', id)
          .then((result) => {
            msg = `Product ${id} succesfully updated.`;
            return res.redirect(`/products/${id}`);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const id = req.url.substr(1, endIndexQmark);
    knex
      .select()
      .table('products')
      .where('id', id)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Product not found';
          return res.redirect('/products');
        }

        knex('products')
          .where('id', id)
          .del()
          .then((result) => {
            msg = `Product ${id} succesfully deleted`;
            res.redirect('/products');
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

routerProducts.route('/:productId/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const id = req.url.substr(1, endIndexSlash);
  knex
    .select()
    .table('products')
    .where('id', id)
    .then((result) => {
      if (result.length === 0) {
        msg = 'Product not found';
        return res.redirect('/products');
      }
      let resultObj = result[0];
      if (msg !== '') {
        resultObj.message = msg;
        msg = '';
      }
      res.render('templates/products/edit', resultObj);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = routerProducts;
