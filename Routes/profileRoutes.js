const express = require('express')
const router = express.Router()
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const {ensureAuthentication} = require('../Middlewares/authMiddleware')
const profileController = require('../Controllers/profileController')


const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());
router.get('/pedit', ensureAuthentication, csrfProtection,profileController.loadEditForm)
router.post('/edit', ensureAuthentication, profileController.updateProfile);
router.post('/delete', ensureAuthentication, csrfProtection, profileController.deleteAccount);




module.exports = router