'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const urlParser = bodyParser.urlencoded({ extended: false });
const PORT = 3000;

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
