const express = require('express');

const router = express.Router();

const Professor = require('../models/professor');

router.post('/new', (req, res) => {
  if (req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const professor = new Professor(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    professor
      .save()
      .then(() => {
        res.status(200).send({ status: 'Professor created Successfully!' });
      })
      .catch((err) => {
        res.error(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});

module.exports = router;
