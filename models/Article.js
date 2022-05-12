const Sequelize = require('sequelize');
const db = require('../config/database');

const Article = db.define('article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Article;