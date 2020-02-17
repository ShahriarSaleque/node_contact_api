const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Bring in the Schema
const Contact = require("../model/Contact");

//POST request
router.post("/", (req, res) => {
  res.send("POSt");
});

//GET request
router.get("/", (req, res) => {
  res.send("GET");
});

module.exports = router;
