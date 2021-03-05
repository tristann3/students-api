const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../models/user");

// SIGN UP FORM
router.get("/sign-up", (req, res) => {
  var currentUser = req.user;

  res.render("sign-up", { currentUser });
});

// LOGIN FORM
router.get("/login", (req, res) => {
  var currentUser = req.user;

  res.render("login", { currentUser });
});

// SIGN UP POST
router.post("/sign-up", (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user
    .save()
    .then((user) => {
      var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "60 days",
      });
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      res.status(200).send({ stauts: "Created Account Successfully" });;
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});

// LOGIN
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, "username password")
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res
            .status(401)
            .send({ message: "Wrong Username or Password" });
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "60 days",
          }
        );
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        return res.status(200).send({ status: "Logged in Successfully!" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("nToken");
  return res.status(200).send({ status: "Logged out Successfully!" });
});

module.exports = router;
