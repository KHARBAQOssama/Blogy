const Comment = require("../Models/Comment");
module.exports = {
    isCommentOwner: async function(req,res,next){
        let comment = new Comment();
        comment = await comment.getComment(parseInt(req.params.id))
        if(req.user.id == comment.userId){
            return next();
        }

        req.flash('error_message', "Forbidden Action for non comment owner")
        res.redirect('/')
    } 

}