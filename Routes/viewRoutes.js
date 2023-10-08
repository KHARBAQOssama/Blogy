const express = require('express')
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const router = express.Router()

const viewController = new ViewController();
router.get('/', (req, res)=>{
    viewController.toHomePage(req,res)
})
router.get('/articles', (req, res)=>{
    viewController.toArticlesPage(req,res)
})
router.get('/', (req, res)=>{
    res.render('welcome')
})
router.get('/addArticle', (req, res)=>{
    res.render('addArticle')
})
router.get('/dashboard', ensureAuthentication,(req, res)=>{
    res.render('dashboard', {
        user: req.user
    })
})

module.exports = router