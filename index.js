const express = require('express')
const app = express()
const db = require('./config/config');
const port = 3000

app.use(express.json()
)

app.use("/articles", require("./routes/Article"))

module.exports = app