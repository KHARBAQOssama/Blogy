const UsersSeeder = require('./usersSeeder');
const ArticlesSeeder = require('./articlesSeeder');
const CommentsSeeder = require('./commentsSeeder');
const CategoriesSeeder = require('./categoriesSeeder');

async function seed() {
  const usersSeeder = new UsersSeeder();
  // const articlesSeeder = new ArticlesSeeder();
  // const commentsSeeder = new CommentsSeeder();
  const categoriesSeeder = new CategoriesSeeder();

  await categoriesSeeder.seedData();
  await usersSeeder.seedData();
  // await articlesSeeder.seedData();
  // await commentsSeeder.seedData();
}

seed();
