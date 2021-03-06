require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Set db
require('./data/students-db');

const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

const checkAuth = (req, res, next) => {
  if (
    typeof req.cookies.nToken === 'undefined'
    || req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// All middlewares above this comment
const router = require('./routes/index.js');

app.use(router);
app.listen(process.env.PORT);
module.exports = app;
