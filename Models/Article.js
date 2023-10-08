const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()

class Article {
    constructor(title,content,cover,createdAt,authorId,CategoryId){
        this.title = title; 
        this.content = content;      
        this.cover = cover;    
        this.createdAt = createdAt;
        this.authorId = authorId;
        this.CategoryId = CategoryId;  
    }

    async get(){
        let articles;
        articles = await prisma.article.findMany(
            {
                skip: 0, 
                take: 6,
                // orderBy: {
                //   comments: {
                //     _count: 'desc'
                //   }
                // },
                include: {
                  author: true,
                  Category:true,
                }
            }
            )
            console.log(articles);
        return articles;
    }
    
    async save(){
        let article = await prisma.article.create({data: {
            title :this.title,
            content :this.content,    
            cover :this.cover,
            createdAt :this.createdAt,
            authorId :this.authorId,
            CategoryId :this.CategoryId,
        }})
        return article;
    }
}

module.exports = Article;