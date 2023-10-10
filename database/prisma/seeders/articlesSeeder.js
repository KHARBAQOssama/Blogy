// articlesSeeder.js
const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

class ArticlesSeeder {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async seedData() {
    try {
      const users = await this.prisma.user.findMany();
      const categories = await this.prisma.category.findMany();

      for (let i = 0; i < 10; i++) {
        await this.prisma.article.create({
          data: {
            title: faker.lorem.sentence(),
            content: {
              // You can generate JSON content as needed
              body: faker.lorem.paragraphs(),
              metadata: {
                author: faker.name.findName(),
                published: faker.date.past(),
              },
            },
            cover: faker.image.imageUrl(),
            authorId: faker.random.arrayElement(users).id,
            CategoryId: faker.random.arrayElement(categories).id,
          },
        });
      }
      console.log('Articles seeded successfully');
    } catch (error) {
      console.error('Error seeding articles:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

module.exports = ArticlesSeeder;
