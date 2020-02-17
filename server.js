const express = require("express");

const app = express();

const port = 5000 || process.env.PORT;

//Connect to DB
require("./db");

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/contacts", require("./routes/contact"));

app.listen(port, () => console.log(`Server started on port ${port}`));
