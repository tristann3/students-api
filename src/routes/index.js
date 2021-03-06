const express = require('express');

const authRoutes = require('./auth.js');
const professorsRoutes = require('./professors.js');
const classesRoutes = require('./classes.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/professors', professorsRoutes);
router.use('/classes', classesRoutes);

module.exports = router;
