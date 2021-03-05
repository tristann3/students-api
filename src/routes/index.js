const express = require('express');

const authRoutes = require('./auth.js');
const studentsRoutes = require('./students.js');
const professorsRoutes = require('./professors.js');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);
router.use('/professors', professorsRoutes);


module.exports = router;
