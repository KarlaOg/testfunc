const express = require("express");

const app = express();
app.use(express.json());

app.use("/articles", require("./routes/Article"));

module.exports = app;