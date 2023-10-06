const express = require('express')
const {PrismaClient} = require("@prisma/client");
const router = express.Router()
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const {ensureAuthentication} = require("../Middlewares/authMiddleware");

router.get('/register', (req, res)=>{
    res.render("register")
})
router.get('/login', (req, res)=>{
    res.render("login")
})


router.post('/register', async(req, res)=>{
    let errors = []
    /*const isAuthor = req.body.isAuthor === 'true';*/
    const {name, email, password, password_confirmed, isAuthor} = req.body
    if (!name || !email || !password || !password_confirmed){
        errors.push({msg: 'name, email, password and password confirmation are required'})
    }

    if(password !== password_confirmed){
        errors.push({msg: 'password confirmation does not match'})
    }

    if (password.length < 8){
        errors.push({msg: "Password length must ne of 8 characters at least"})
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password_confirmed
        })
    }else {
        const userFound = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (userFound !== null){
            errors.push({msg: "User already registered"})
            res.render('register', {
                errors,
                name,
                email,
                password,
                password_confirmed
            })
        }else{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await prisma.user.create({
                data: {
                    full_name: name,
                    email: email,
                    password: hashedPassword,
                    isAuthor: isAuthor === 'true',
                }
            })
            req.flash('success_message', "You are registered")
            res.redirect('/auth/login');
        }
    }
})

router.post('/login',(req, res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req,res,next)
})


router.get('/logout', ensureAuthentication,(req, res)=>{
    req.logOut(()=>{
        req.flash("success_message", "Logged out")
        res.redirect('/auth/login')
    });

})

module.exports = router