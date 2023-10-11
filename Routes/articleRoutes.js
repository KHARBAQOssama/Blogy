const express = require('express');
const router = express.Router();
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const {isAuthor , isArticleOwner} = require("../Middlewares/articleMiddleware")
const ArticleController = require('../Controllers/articleController')
const articleController = new ArticleController();

const csrf = require('csurf'); 
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());

router.post('/', ensureAuthentication, isAuthor, csrfProtection, isArticleOwner, articleController.create);
router.post('/:id/delete', ensureAuthentication, isAuthor, isArticleOwner, articleController.delete);
router.post('/:id/update', ensureAuthentication, isAuthor, csrfProtection, isArticleOwner, articleController.update);

module.exports = router;