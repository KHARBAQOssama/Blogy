const express = require('express')
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const router = express.Router()

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