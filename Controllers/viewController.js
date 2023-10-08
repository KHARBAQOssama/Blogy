const Article = require('../Models/Article');
const { formatDate } = require('../utils/tools');
const article = new Article();


class ViewController {
    async toHomePage(req,res){
        let articles = await article.get();
        articles.forEach(article=>{
            article.createdAt = formatDate(article.createdAt);
        })

        if (req.isAuthenticated()) {
            const user = req.user;
            res.render('home', { user : user, articles : articles });
        }else{
            res.render('home',{ user : null , articles : articles})
        }

    }

    async toArticlesPage(req,res){
        let count = await article.getCount();
        let page = req.query.page ? req.query.page : 1;

        if(Math.ceil(count/9) < page){
            page = Math.ceil(count/9)
        }

        let articles = await article.get(page);
        let pagination = {
            count,
            page
        }
        articles.forEach(article=>{
            article.createdAt = formatDate(article.createdAt);
        })
        if (req.isAuthenticated()) {
            const user = req.user;
            res.render('articles', { user : user, articles : articles, pagination : pagination });
        }else{
            res.render('articles',{ user : null , articles : articles, pagination : pagination})
        }
    }
}

module.exports = ViewController;