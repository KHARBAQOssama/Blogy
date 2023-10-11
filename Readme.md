# Blogy:
 Welcome to our Blog Platform! This is a web application that allows users to engage in various activities related to blogging. Users can create, read, edit, and delete their own blog articles. Here's an overview of what this platform offers
 ## Installation:
 Before starting the app you should have:

**Node.js** installed on your machin.
**Git** installed on your machin.

 1. First clone the repository, following this command:

        git clone https://github.com/KHARBAQOssama/Blogy.git

2. Install dependencies:

        npm install
## Configuration:
 Update .env file and change the port to 3000.

## Database :
 1. run databse migration: 

        npm run prisma:migrate

2. run database seeder:

        npm run seed
## Running the application:
 To execute the project follow this command:

        npm run dev

 Now the app will be available at
  `http://localhost:300`


## Technologies using:

**Front-End**: HTML, CSS, JavaScript, and *ejs* (Embedded JavaScript) is a template engine for server-side rendering in this Node.js application.

- **Back-End**: Node.js and Express.js for the server-side logic.

- **Database**: We use *MySQL* database to store user information, articles, and other data. 

- **User Authentication**: Passport.js  authentication middleware for securing user accounts.

- **Version Control**: Git for code management and collaboration.
