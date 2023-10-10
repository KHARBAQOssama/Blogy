const Article = require('../Models/Article');
const { formatDate } = require('../utils/tools');
const article = new Article();


class ViewController {
    async toHomePage(req,res){
        let articles = await article.get();
        articles.forEach(article=>{
            article.createdAt = formatDate(article.createdAt);
        })

        let user = req.isAuthenticated() ? req.user : null;
        res.render('home', { user : user, articles : articles });
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
        
        let user = req.isAuthenticated() ? req.user : null;
        res.render('articles', { user : user, articles : articles, pagination : pagination });
    }


    async toArticleDetails(req,res){
        let articleDetail = await article.getArticle(parseInt(req.params.id));
        articleDetail.createdAt = formatDate(articleDetail.createdAt);
        articleDetail.content = JSON.parse(articleDetail.content);
        console.log(articleDetail);
        let sideArticles = await article.getSideArticles(articleDetail.Category.id);
        sideArticles.forEach(article=>{
            article.createdAt = formatDate(article.createdAt);
        })

        console.log(sideArticles);
        let user = req.isAuthenticated() ? req.user : null;
        res.render('articleDetails',{ user : user , article : articleDetail,sideArticles : sideArticles})
    }

    async toDashboardStatics(req,res){
        res.render('dashboard',{ 
            user: req.user, 
            page : 'home' , 
            data : { 
                    articles : await article.getUserArticles(req.user.id), 
                    comments : await article.getCommentsCount(req)
                    }
                }
            );
    }
}

module.exports = ViewController;