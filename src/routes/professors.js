const express = require('express');

const router = express.Router();

const Professor = require('../models/professor');

router.post('/new', (req, res) => {
  if (req.user) {
    const professor = new Professor(req.body);
    professor
      .save()
      .then(() => {
        res.send({ status: 200, message: 'Professor created Successfully!' });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});

module.exports = router;
