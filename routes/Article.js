const { Router } = require('express');
const articleController = require('../controllers/article.controller');
const router = new Router();
const auth = require('../middleware/auth');

router.get('/', articleController.getAllArticle);
router.get('/:id', articleController.getByArticle);
router.post('/', auth, articleController.createArticle);
router.put('/:id', auth, articleController.updatArticle);
router.delete('/:id', auth, articleController.deleteArticle);

module.exports = router;
