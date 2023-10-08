const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

class CategoriesSeeder {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async seedData() {
    try {
      for (let i = 0; i < 5; i++) {
        await this.prisma.category.create({
          data: {
            name: faker.lorem.word(),
          },
        });
      }
      console.log('Categories seeded successfully');
    } catch (error) {
      console.error('Error seeding categories:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

module.exports = CategoriesSeeder;
