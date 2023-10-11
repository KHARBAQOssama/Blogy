const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const viewController = new ViewController();
const {isAuthor , isArticleOwner} = require("../Middlewares/articleMiddleware")

const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());

router.get('/', ensureAuthentication,  isAuthor, viewController.toDashboardStatics)
router.get('/editArticle/:id',ensureAuthentication, csrfProtection,  isAuthor, isArticleOwner, viewController.toArticleEdit)
router.get('/addArticle',ensureAuthentication,csrfProtection,  isAuthor, viewController.toArticleAdd)

module.exports = router