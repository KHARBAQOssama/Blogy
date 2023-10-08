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
}

module.exports = ViewController;