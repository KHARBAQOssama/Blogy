const express = require('express')
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const router = express.Router()

const viewController = new ViewController();
router.get('/', viewController.toHomePage)
router.get('/articles',viewController.toArticlesPage)
router.get('/article/:id', viewController.toArticleDetails)
// router.get('/addArticle', (req, res)=>{
//     res.render('addArticle')
// })
// router.get('/editArticle', (req, res)=>{
//     res.render('editArticle')
// })

module.exports = router