const express = require('express');
const router = express.Router();
const ArticleController = require('../Controllers/articleController')
const articleController = new ArticleController();


router.post('/', (req,res)=>{
    articleController.create(req,res)
});

module.exports = router;