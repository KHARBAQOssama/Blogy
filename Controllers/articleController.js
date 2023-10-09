const Article = require('../Models/Article');
const { storeImageGetPath } = require('../utils/tools');

class ArticleController {
    async create(req,res){
        let newArticle = req.body.article;
        if(newArticle.new_category){
            // Add category Process
            newArticle.category = 1;
        }else{
            newArticle.category = parseInt(newArticle.category);
        }
        if(newArticle.cover){
            newArticle.cover = await storeImageGetPath(newArticle.cover)
        }
        await Promise.all(newArticle.items.map(async (item) => {
            if (item.type === 'image') {
              item.content = await storeImageGetPath(item.content);
            }
        }));
        newArticle.items = JSON.stringify(newArticle.items);
        let article = new Article(newArticle.title,newArticle.items,newArticle.cover,new Date(),1,newArticle.category);
        article = await article.save();
        console.log(article);
        res.status(201).json({ message: `Article stored successfully` });
        // res.render('index');
    }
}

module.exports = ArticleController;