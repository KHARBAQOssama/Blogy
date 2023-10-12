const express = require('express')
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()


exports.showNewForm = (req, res) => {
    res.render('categories/new',  { csrfToken: req.csrfToken() });
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
   
    await prisma.category.create({
        data: { name },
    });
    res.redirect('/categories');
};



exports.getAllCategories = async (req, res) => {
    const categories = await prisma.category.findMany();
    res.render('categories/index', { categories, csrfToken: req.csrfToken()  });
  };

  exports.showEditForm = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    res.render('categories/edit', { category , csrfToken: req.csrfToken() });
  };



exports.updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;
    await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });
    res.redirect('/categories');
  };


  exports.deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    await prisma.category.delete({
      where: { id: categoryId },
    });
    res.redirect('/categories');
  };
  