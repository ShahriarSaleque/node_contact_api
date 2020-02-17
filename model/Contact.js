const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model("Contact", Schema);

module.exports = Contact;
