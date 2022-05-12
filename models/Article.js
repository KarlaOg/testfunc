const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Article extends Model {}

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt:{
      type: DataTypes.DATE,
    },
    updatedAt:{
      type: DataTypes.DATE,
    }
  },
  {
    sequelize,
  }
);

module.exports = Article;