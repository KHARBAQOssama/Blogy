const express = require('express')
const router = express.Router()
const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const authController = require('../Controllers/authController');


const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());
router.get('/register',csrfProtection,authController.renderRegisterForm)
router.get('/login', csrfProtection,authController.renderLoginForm)


router.post('/register',csrfProtection,authController.registerUser)

router.post('/login',csrfProtection,authController.loginUser)


router.get('/logout',csrfProtection, ensureAuthentication,authController.logoutUser)

module.exports = router