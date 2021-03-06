const express = require('express');
const { deleteOne } = require('../models/professor');

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
router.get('/', (req, res) => {
  if (req.user) {
    Professor.find({})
      .lean()
      .populate('classes')
      .then((professors) => {
        res.send({ status: 200, professors });
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});
router.delete('/:id/delete', (req, res) => {
  if (req.user) {
    Professor.findByIdAndDelete(req.id)
      .then(() => {
        res.send({ status: 200, message: 'Professor deleted Successfully!' });
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
  return 1;
});

module.exports = router;
