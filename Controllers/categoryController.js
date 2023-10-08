const express = require('express')
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()


exports.showNewForm = (req, res) => {
    res.render('categories/new');
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Category name is required.'); // Validation : Le nom est requis
    }
    console.log('Name received from form:', name);
    await prisma.category.create({
        data: { name },
    });
    res.redirect('/categories');
};
