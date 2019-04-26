'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const urlParser = bodyParser.urlencoded({ extended: false });
const PORT = 3000;
const methodOverride = require('method-override');

const articles = require('./routes/articles.js');
const products = require('./routes/products.js');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/products', urlParser, products);
app.use('/articles', urlParser, articles);

app.get('/', (req, res) => {
  res.render('main');
});

const server = app.listen(PORT, () => {
  console.log(`Express app is listening on port ${PORT}`);
});
