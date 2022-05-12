const express = require('express')
const app = express()
const db = require('./config/config');
const port = 3000


app.get('/', (req, res) => {
  res.send("Hello World")
})

app.get('/testDB', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})