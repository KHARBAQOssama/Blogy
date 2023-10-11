const express = require('express');
const router = express.Router();
const ArticleController = require('../Controllers/articleController')
const articleController = new ArticleController();


router.post('/', articleController.create);
router.post('/:id/delete', articleController.delete);
router.post('/:id/update', articleController.update);

module.exports = router;