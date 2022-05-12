const { Sequelize } = require('sequelize');
const db = new Sequelize('blog', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = db;