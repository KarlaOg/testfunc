'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'authorId',
        onDelete: 'CASCADE',
      });
    }
  }
  Article.init(
    {
      title: { type: DataTypes.STRING, required: true, allowNull: false },
      content: { type: DataTypes.STRING, required: true, allowNull: false },
      author: { type: DataTypes.STRING, required: true, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
