const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()

class Comment {
    constructor(text,userId,articleId){
        this.text = text; 
        this.userId = userId;      
        this.articleId = articleId; 
    }

    async save(){
        let comment = await prisma.comment.create({data: {
            text :this.text,
            userId :this.userId,    
            articleId :this.articleId,
        }})
        return comment;
    }

   
}

module.exports = Comment;