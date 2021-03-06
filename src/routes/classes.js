const express = require('express');

const router = express.Router();

const Class = require('../models/class');

router.post('/new', (req, res) => {
  if (req.user) {
    const newClass = new Class(req.body);
    newClass
      .save()
      .then(() => {
        res.send({ status: 200, message: 'Class created Successfully!' });
      })
      .catch((err) => {
        res.error(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});
router.get('/', (req, res) => {
  if (req.user) {
    Class.find({})
      .lean()
      .populate('professor')
      .then((classes) => {
        res.send({ status: 200, classes });
      });
  }
});
router.delete('/:id/delete', (req, res) => {
  if (req.user) {
    Class.findByIdAndDelete(req.id)
      .then(() => {
        res.send({ status: 200, message: 'Class deleted Successfully!' });
      });
  }
});

module.exports = router;
