const Article = require('../Models/Article');
const Category = require('../Models/Category');
const { storeImageGetPath } = require('../utils/tools');

class ArticleController {
    async create(req,res){
        let newArticle = req.body.article;
        if(newArticle.new_category){
            let category = await Category.getOne(newArticle.new_category);
            if(!category){
                category = new Category(newArticle.new_category);
                category = await category.save();
            }
            newArticle.category = category.id;
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
    async delete(req,res){
        let deleted = await Article.delete(req.params.id);
        if(deleted){
            req.flash('success_message', 'Article deleted successfully');
            const referer = req.header('Referer') || '/';
            res.redirect(referer);
        }
    }
    async update(req,res){
        let newArticle = req.body.article;
        if(newArticle.new_category){
            let category = await Category.getOne(newArticle.new_category);
            if(!category){
                category = new Category(newArticle.new_category);
                category = await category.save();
            }
            newArticle.category = category.id;
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
        article = await article.update(newArticle.id);
        console.log(article);
        res.status(201).json({ message: `Article updated successfully` });
    }
}

module.exports = ArticleController;