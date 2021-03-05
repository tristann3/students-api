const express = require('express');

const authRoutes = require('./auth.js');
const studentsRoutes = require('./students.js');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);

module.exports = router;
