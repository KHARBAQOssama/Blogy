const express = require('express')
const {PrismaClient} = require("@prisma/client");
const router = express.Router()


const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');

const categoryController = require('../Controllers/categoryController')



const {ensureAuthentication} = require("../Middlewares/authMiddleware");


router.use(cookieParser());

const csrfProtection = csrf({ cookie: true });



router.get('/',ensureAuthentication,csrfProtection, categoryController.getAllCategories);
router.get('/new',ensureAuthentication, csrfProtection,categoryController.showNewForm);
router.post('/new2',ensureAuthentication,csrfProtection,csrfProtection, categoryController.createCategory);
router.get('/:id/edit',ensureAuthentication,csrfProtection, categoryController.showEditForm);
router.post('/:id/edit', ensureAuthentication,csrfProtection,categoryController.updateCategory);
router.post('/:id/delete',ensureAuthentication,csrfProtection,categoryController.deleteCategory);

module.exports = router;
