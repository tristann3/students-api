/* Mongoose Connection */
const mongoose = require('mongoose');
const assert = require('assert');

const url = 'mongodb://localhost/reddit-db';

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    assert.equal(null, err);
  },
);

mongoose.set('debug', true);

module.exports = mongoose.connection;
