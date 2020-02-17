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
      .isEmpty(),
    check("number", "Only numbers allowed").isNumeric()

    // check("number").matches("^(?:+?88|0088)?01[15-9]d{8}$")
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Errors found -- Display error message
      return res.status(422).json({ errors: errors.array() });
    } else {
      //Create a contact
      const { name, number } = req.body;

      //Instantiate a Contact_Schema object
      try {
        const newContact = new Contact({
          name,
          number
        });
        //Insert to DB
        const contact = await newContact.save();
        return res.json(contact);
      } catch (error) {
        return res.status(500).send("Internal Server Error");
      }
    }
  }
);

//GET all contact
router.get("/:", async (req, res) => {
  const contacts = await Contact.find();
  return res.json(contacts);
});

//GET specific contact
router.get("/:contact", async (req, res) => {
  const contacts = await Contact.find({ number: req.params.contact });
  return res.json(contacts);
});

module.exports = router;
