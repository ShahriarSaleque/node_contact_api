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
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Errors found -- Display error message
      return res.status(422).json({ errors: errors.array() });
    } else {
      //Create a contact
      const { name, number } = req.body;

      if (number.length != 11) {
        return res.status(422).json({ msg: "Invalid phone number" });
      }

      if (
        number.startsWith("017") ||
        number.startsWith("019") ||
        number.startsWith("018") ||
        number.startsWith("016") ||
        number.startsWith("015")
      ) {
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
      } else {
        return res.status(422).json({ msg: "Invalid phone number" });
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

//Edit a specific contact
router.put("/:contact", async (req, res) => {
  const contact = await Contact.find({ number: req.params.contact });

  //contact not exists
  if (!contact) {
    return res.status(404).json({ msg: "Contact not found" });
  } else {
    const { name, number } = req.body;
    let update_contact = {};
    if (name) update_contact.name = name;
    if (number) update_contact.number = number;

    const contact = await Contact.update(
      { number: req.params.contact },
      { $set: update_contact },
      { new: true }
    );
  }
});

router.delete("/:contact", async (req, res) => {
  const contact = await Contact.find({ number: req.params.contact });

  //contact not exists
  if (!contact) {
    return res.status(404).json({ msg: "Contact not found" });
  } else {
    try {
      await Contact.findOneAndDelete({ number: req.params.contact });
      return res.json({ msg: "Contact deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  }
});

module.exports = router;
