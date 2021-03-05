const express = require('express');

const router = express.Router();

const Student = require('../models/student');

router.post('/new', (req, res) => {
  if (req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const student = new Student(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    student
      .save()
      .then(() => res.status(200).send({ status: 'Student created Successfully!' }))
      .catch((err) => {
        res.error(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});

module.exports = router;
