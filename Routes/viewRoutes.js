const express = require('express')
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const router = express.Router()
const csrf = require('csurf'); 
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());

const viewController = new ViewController();
router.get('/', viewController.toHomePage)
router.get('/articles',viewController.toArticlesPage)
// router.get('/article/:id', csrfProtection, viewController.toArticleDetails)


module.exports = router