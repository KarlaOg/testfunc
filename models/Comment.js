const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    creation_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
});

module.exports = Comment;