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

    async get(page = null){
        let articles;
        articles = await prisma.article.findMany(
            {
                skip: page ? (page-1)*9 : 0, 
                take: page ? 9 : 6,
                include: {
                  author: true,
                  Category:true,
                }
            }
            )
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

    async getCount(){
        const count = await prisma.article.count();
        return count;
    }

    async getArticle(id){
        return await prisma.article.findUnique({
            where : {
                id : id
            },
            include : {
                comments : {
                    include: {
                      user: true,
                    }
                  },
                author:true,
                Category:true
            }
        })
    }

    async getSideArticles(categoryId){
        let articles;
        articles = await prisma.article.findMany(
            {
                take: 5,
                include: {
                  author: true,
                },
                where:{
                    CategoryId : categoryId
                }
            }
            )
        return articles;
    }
}

module.exports = Article;