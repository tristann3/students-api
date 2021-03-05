const express = require("express");

const authRoutes = require("./auth.js");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
