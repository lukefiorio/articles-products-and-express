const express = require('express');
const routerArticles = express.Router();

routerArticles
  .route('/')
  .get((req, res) => {
    res.send('About me');
  })
  .post((req, res) => {
    res.send('Added to About Me');
  })
  .put((req, res) => {
    res.send('Update About Me');
  });

module.exports = routerArticles;
