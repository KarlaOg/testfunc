const models = require('../models');

const getAllArticle = async (req, res) => {
  const article = await models.Article.findAll({ where: req.query });
  res.send(article);
};

const createArticle = async (req, res) => {};

const getArticleById = async (req, res) => {};

const updatArticle = async (req, res) => {};

const deleteArticle = async (req, res) => {};

module.exports = {
  getAllArticle,
  createArticle,
  getArticleById,
  updatArticle,
  deleteArticle,
};
