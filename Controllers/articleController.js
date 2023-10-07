const Article = require('../Models/Article')

class ArticleController {
    async create(req,res){
        console.log(req);
        return;
        let article = new Article(req.title,req.content,req.cover,req.createdAt,req.authorId,req.CategoryId);
        article = await article.save();
        res.render('index');
    }
}

module.exports = ArticleController;