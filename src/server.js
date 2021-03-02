require("dotenv/config")
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

// Set db
require("./data/students-db");

const app = express();

// Middleware
app.use(express.static("src/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(expressValidator());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// All middlewares above this comment
const router = require("./routes/index.js");
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});


module.exports = app;
