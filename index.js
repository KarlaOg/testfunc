const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Database Connection
const db = require('./config/database');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use(cors("*"));

const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));