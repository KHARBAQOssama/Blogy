const express = require('express')
const {PrismaClient} = require("@prisma/client");
const router = express.Router()

const categoryController = require('../Controllers/categoryController')

router.get('/', categoryController.getAllCategories);
router.get('/new', categoryController.showNewForm);
router.post('/new2', categoryController.createCategory);
router.get('/:id/edit', categoryController.showEditForm);
router.post('/:id/edit', categoryController.updateCategory);
router.post('/:id/delete', categoryController.deleteCategory);

module.exports = router;
