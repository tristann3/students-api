require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Set db
require('./data/students-db');

const app = express();

// Middleware
app.use(express.static('src/public'));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  console.log(req.cookies);
  if (
    typeof req.cookies.nToken === 'undefined'
    || req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log('Successfully Authenticated');
  }

  next();
};
app.use(checkAuth);

// All middlewares above this comment
const router = require('./routes/index.js');

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = app;
