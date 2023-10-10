const Comment = require('../Models/Comment');

class CommentController {
    static async create(req,res){
        let userId = req.user.id;
        let text = req.body.text;
        let articleId = parseInt(req.params.id);

        let comment = new Comment(text,userId,articleId);
        let newComment = await comment.save();

        console.log(newComment)
        res.redirect('/article/'+articleId);
    }
      
    }
module.exports = CommentController;
