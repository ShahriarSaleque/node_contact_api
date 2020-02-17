const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Bring in the Schema
const Contact = require("../model/Contact");

//Express-validator for validation
const { check, validationResult } = require("express-validator");

//POST request
router.post(
  "/",

  [
    check("name", "Name field is required")
      .not()
      .isEmpty(),
    check("number", "Number field is required")
      .not()
      .isEmpty()
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Errors found -- Display error message
      return res.status(422).json({ errors: errors.array() });
    } else {
      return res.send("Success");
    }
  }
);

//GET request
router.get("/", (req, res) => {
  res.send("GET");
});

module.exports = router;
