const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

class CommentsSeeder {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async seedData() {
    try {
      const users = await this.prisma.user.findMany();
      const articles = await this.prisma.article.findMany();

      for (let i = 0; i < 10; i++) {
        await this.prisma.comment.create({
          data: {
            text: faker.lorem.sentence(),
            userId: faker.random.arrayElement(users).id,
            articleId: faker.random.arrayElement(articles).id,
          },
        });
      }
      console.log('Comments seeded successfully');
    } catch (error) {
      console.error('Error seeding comments:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

module.exports = CommentsSeeder;
