const models = require('../models');

const getAllArticle = async (req, res) => {
  const articles = await models.Article.findAll({ where: req.query });
  res.send(articles);
};
const getByArticle = async (req, res) => {
  try {
    const article = await models.Article.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json(article);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await models.Article.create(req.body);
    res.status(201).send(article);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

const updatArticle = async (req, res) => {
  try {
    const article = await models.Article.update(req.body, { where: req.query });
    res.status(200).send(article);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

const deleteArticle = async (req, res) => {
  try {
    await models.Article.destroy({ where: req.query });
    res.status(200).json({ message: 'article deleted' });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

module.exports = {
  getAllArticle,
  createArticle,
  updatArticle,
  deleteArticle,
  getByArticle,
};
