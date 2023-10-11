const Article = require("../Models/Article");
module.exports = {
    isAuthor: function(req, res, next){
        if (req.isAuthenticated() && req.user.isAuthor){
              return next()  
        }

        req.flash('error_message', "Forbidden Action for non authors")
        res.redirect('/')
    },
    isArticleOwner: async function(req,res,next){
        let article = new Article();
        article = await article.getArticle(parseInt(req.params.id))
        if(req.user.id == article.authorId){
            return next();
        }

        req.flash('error_message', "Forbidden Action for non authors")
        res.redirect('/')
    } 

}