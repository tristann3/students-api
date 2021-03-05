const express = require("express");
const router = express.Router();

const Student = require("../models/student");


router.post("/new", (req, res) => {
  console.log("nlskdjfhlask")

  if (req.user) {
    console.log("ASDFKASDFASFD")
    // INSTANTIATE INSTANCE OF POST MODEL
    const student = new Student(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    student
      .save()
      .then((student) => {
        return res.status(200).send({ status: "Student created Successfully!" })
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

module.exports = router;
