const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = new PrismaClient();


exports.renderRegisterForm = (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });
};

exports.renderLoginForm = (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
};

exports.registerUser =  async(req, res)=>{

    let errors = []
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
                password_confirmed,
                csrfToken: req.csrfToken()
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
}

exports.loginUser =(req, res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req,res,next)
}

exports.logoutUser = (req, res) => {
    req.logOut(() => {
        req.flash('success_message', 'Logged out');
        res.redirect('/auth/login');
    });
};