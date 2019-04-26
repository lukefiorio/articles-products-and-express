const express = require('express');
const routerArticles = express.Router();
const articleDB = require('./../db/articles.js');

routerArticles
  .route('/')
  .get((req, res) => {
    articleDB.emptyMessage();
    res.render('templates/articles/index', articleDB.retrieveAll());
  })
  .post((req, res) => {
    res.render('templates/articles/index', articleDB.create(req.body));
  });

routerArticles.route('/new').get((req, res) => {
  res.render('templates/articles/new', articleDB.retrieveAll());
});

routerArticles
  .route('/:title')
  .get((req, res) => {
    const articleUrl = req.url.slice(1);
    articleDB.emptyMessage();
    res.render(`templates/articles/${articleDB.retrieveOne(articleUrl).returnPage}`, articleDB.retrieveOne(articleUrl));
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    res.render('templates/articles/article', articleDB.update(req.body, articleUrl));
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    res.render('templates/articles/index', articleDB.remove(articleUrl));
  });

routerArticles.route('/:title/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const articleUrl = req.url.substr(1, endIndexSlash);
  res.render('templates/articles/edit', articleDB.retrieveOne(articleUrl));
});

module.exports = routerArticles;
