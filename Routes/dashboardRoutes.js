const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const viewController = new ViewController();

router.get('/', ensureAuthentication, viewController.toDashboardStatics)
router.get('/editArticle/:id',ensureAuthentication, viewController.toArticleEdit)
router.get('/addArticle',ensureAuthentication, viewController.toArticleAdd)

module.exports = router