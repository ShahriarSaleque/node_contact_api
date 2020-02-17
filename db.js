const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Shahriar:shahriar1234@cluster0-aqhid.mongodb.net/test?retryWrites=true&w=majority";

module.exports = {
    mongoose
    .connect(mongoURI, {
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB is connected..."))
    .catch(err => console.log(err));
  

}
 