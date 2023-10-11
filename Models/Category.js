const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()

class Category {
    constructor(name){
        this.name = name; 
    }
    async save(){
        let category = await prisma.category.create({data: {
            name :this.name,
        }})
        return category;
    }
    static async getOne(name){
        let category = await prisma.category.findFirst({
            where: {
                name : name
            }
        })
        return category;
    }
    static async getAll(){
        let categories = await prisma.category.findMany()
        return categories;
    }
}

module.exports = Category;