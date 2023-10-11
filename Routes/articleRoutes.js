const express = require('express');
const router = express.Router();
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const {isAuthor , isArticleOwner} = require("../Middlewares/articleMiddleware")
const ViewController = require('../Controllers/viewController');
const viewController = new ViewController();
const ArticleController = require('../Controllers/articleController')
const articleController = new ArticleController();

const csrf = require('csurf'); 
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());


router.get('/:id', csrfProtection, viewController.toArticleDetails)
router.post('/', ensureAuthentication, isAuthor, csrfProtection, articleController.create);
router.post('/:id/delete', ensureAuthentication, isAuthor, isArticleOwner, articleController.delete);
router.post('/:id/update', ensureAuthentication, isAuthor, csrfProtection, isArticleOwner, articleController.update);

module.exports = router;