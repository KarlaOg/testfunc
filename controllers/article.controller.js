const models = require('../models');
const { prettifyErrors } = require('../lib/utils');

const getAllArticle = async (req, res) => {
  const articles = await models.Article.findAll({ where: req.query });
  res.send(articles);
};
const getByArticle = async (req, res) => {
  try {
    const article = await models.Article.findOne({
      where: { id: req.params.id },
    });

    if (!article) {
      return res.sendStatus(404);
    }
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
      res.status(400).send(prettifyErrors(error));
    } else {
      res.sendStatus(500);
    }
  }
};

const updatArticle = async (req, res) => {
  try {
    const result = await models.Article.update(req.body, {
      where: { id: parseInt(req.params.id) },
      returning: true,
    });

    if (!result[0]) {
      return res.sendStatus(404);
    }
    const [, [article]] = result;
    res.status(200).send(article);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send(prettifyErrors(error));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await models.Article.destroy({ where: req.params });
    if (article === 0) {
      return res.sendStatus(403);
    }
    res.status(204).json({ message: 'article deleted' });
    console.log(article);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllArticle,
  createArticle,
  updatArticle,
  deleteArticle,
  getByArticle,
};
