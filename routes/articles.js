const express = require('express');
const routerArticles = express.Router();
const knex = require('../db');
let msg = '';

routerArticles
  .route('/')
  .get((req, res) => {
    knex
      .select()
      .table('articles')
      .orderBy('id')
      .then((result) => {
        let resultObj = { rows: result };
        if (msg !== '') {
          resultObj.message = msg;
          msg = '';
        }
        return res.render('templates/articles/index', resultObj);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    const reqTitle = req.body.title;
    const reqAuthor = req.body.author;
    const reqBody = req.body.body;
    let reqUrlTitle;
    if (reqTitle) {
      reqUrlTitle = encodeURI(reqTitle);
    }
    const hasKeys = reqTitle && reqAuthor && reqBody;
    if (!hasKeys) {
      msg = 'Must post all article fields';
      return res.redirect('/articles/new');
    }
    knex('articles')
      .insert({ title: reqTitle, author: reqAuthor, body: reqBody, urlTitle: reqUrlTitle })
      .returning('*')
      .then((result) => {
        msg = 'Article succesfully added';
        return res.redirect('/articles');
      })
      .catch((err) => {
        res.status(500).send('err' + err);
      });
  });

routerArticles.route('/new').get((req, res) => {
  let resultObj = {};
  if (msg !== '') {
    resultObj.message = msg;
    msg = '';
  }
  res.render('templates/articles/new', resultObj);
});

routerArticles
  .route('/:title')
  .get((req, res) => {
    const articleUrl = req.url.slice(1);
    knex
      .select()
      .table('articles')
      .where('urlTitle', articleUrl)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Article not found';
          return res.redirect('/articles');
        }
        let resultObj = result[0];
        if (msg !== '') {
          resultObj.message = msg;
          msg = '';
        }
        res.render('templates/articles/article', resultObj);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .put((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    knex
      .select()
      .table('articles')
      .where('urlTitle', articleUrl)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Article not found';
          return res.redirect('/articles');
        }
        let updateObj = {};
        if (req.body.title) {
          updateObj.title = req.body.title;
          updateObj.urlTitle = encodeURI(req.body.title);
        }
        if (req.body.author) {
          updateObj.author = req.body.author;
        }
        if (req.body.body) {
          updateObj.body = req.body.body;
        }

        if (Object.keys(updateObj).length === 0) {
          msg = 'No field values were provided';
          return res.redirect(`/articles/${articleUrl}/edit`);
        }
        knex('articles')
          .update(updateObj)
          .where('urlTitle', articleUrl)
          .then((result) => {
            msg = 'Article succesfully updated.';
            return res.redirect(`/articles/${articleUrl}`);
          })
          .catch((err) => {
            res.status(500).send('err' + err);
          });
      })
      .catch((err) => {
        res.status(500).send('err' + err);
      });
  })
  .delete((req, res) => {
    const endIndexQmark = req.url.indexOf('?', 1) - 1;
    const articleUrl = req.url.substr(1, endIndexQmark);
    knex
      .select()
      .table('articles')
      .where('urlTitle', articleUrl)
      .then((result) => {
        if (result.length === 0) {
          msg = 'Article not found';
          return res.redirect('/articles');
        }
        knex('articles')
          .where('urlTitle', articleUrl)
          .del()
          .then((result) => {
            msg = 'Article succesfully deleted';
            res.redirect('/articles');
          })
          .catch((err) => {
            res.status(500).send('err' + err);
          });
      })
      .catch((err) => {
        res.status(500).send('err' + err);
      });
  });
// issues: don't allow same title; better way to deal with Qmark in title.
routerArticles.route('/:title/edit').get((req, res) => {
  const endIndexSlash = req.url.indexOf('/', 1) - 1;
  const articleUrl = req.url.substr(1, endIndexSlash);
  knex
    .select()
    .table('articles')
    .where('urlTitle', articleUrl)
    .then((result) => {
      if (result.length === 0) {
        msg = 'Article not found';
        return res.redirect('/articles');
      }
      let resultObj = result[0];
      if (msg !== '') {
        resultObj.message = msg;
        msg = '';
      }
      res.render('templates/articles/edit', resultObj);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = routerArticles;
