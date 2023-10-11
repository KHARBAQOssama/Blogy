const express = require('express')
const {PrismaClient} = require("@prisma/client");
const router = express.Router()

const categoryController = require('../Controllers/categoryController')

const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const {ensureAuthentication} = require("../Middlewares/authMiddleware");

const csrfProtection = csrf({ cookie: true });

router.get('/',ensureAuthentication, categoryController.getAllCategories);
router.get('/new',ensureAuthentication, categoryController.showNewForm);
router.post('/new2',ensureAuthentication, categoryController.createCategory);
router.get('/:id/edit',ensureAuthentication, categoryController.showEditForm);
router.post('/:id/edit', ensureAuthentication,categoryController.updateCategory);
router.post('/:id/delete',ensureAuthentication,categoryController.deleteCategory);

module.exports = router;
