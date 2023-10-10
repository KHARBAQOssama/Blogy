const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

class UsersSeeder {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async seedData() {
    try {
      for (let i = 0; i < 10; i++) {
        await this.prisma.user.create({
          data: {
            full_name: faker.name.findName(),
            email: faker.internet.email(),
            password: 'hashedpassword', 
            isAuthor: faker.datatype.boolean(),
            image: faker.image.imageUrl(),
          },
        });
      }
      console.log('Users seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

module.exports = UsersSeeder;
