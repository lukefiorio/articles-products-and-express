const express = require('express');
const routerArticles = express.Router();
const knex = require('../db');
const articleDB = require('./../db/articles.js');

routerArticles
  .route('/')
  .get((req, res) => {
    res.render('templates/articles/index', articleDB.retrieveAll());
    articleDB.removeMessage();
  })
  .post((req, res) => {
    articleDB.create(req.body);
    res.redirect('/articles');
  });

routerArticles.route('/new').get((req, res) => {
  res.render('templates/articles/new', articleDB.retrieveAll());
});

routerArticles
  .route('/:title')
  .get((req, res) => {
    const articleUrl = req.url.slice(1);
    const findArticle = articleDB.getIndex(articleUrl);
    if (findArticle === -1) {
      return res.redirect('/articles');
    }
    // if last message on specific article was for a failed edit ...
    // then remove the message when routing to "/articles/:urlTitle" ...
    // since message was displayed originally on re-route to "/articles"
    if (articleDB.getMessage(articleUrl) === '{ "success": false, "message": "No field values were provided" }') {
      articleDB.removeMessage(articleUrl);
    }
    res.render(`templates/articles/article`, articleDB.retrieveOne(articleUrl));
    articleDB.removeMessage(articleUrl);
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    articleDB.update(req.body, articleUrl);
    const errorMsg = articleDB.getMessage(articleUrl).indexOf('"success": false') > -1;
    if (errorMsg) {
      res.redirect('/articles');
    } else {
      res.redirect(`/article/${articleUrl}`);
    }
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    articleDB.remove(articleUrl);
    res.redirect('/articles');
  });

routerArticles.route('/:title/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const articleUrl = req.url.substr(1, endIndexSlash);
  res.render('templates/articles/edit', articleDB.retrieveOne(articleUrl));
});

module.exports = routerArticles;
