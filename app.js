const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/articles', require('./routes/Article'));
app.use('/users', require('./routes/User'));

module.exports = app;
