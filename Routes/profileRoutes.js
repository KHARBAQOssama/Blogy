const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require('../Middlewares/authMiddleware')
const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');
const profileController = require('../Controllers/profileController')


const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());
router.get('/pedit', ensureAuthentication, csrfProtection, (req, res)=>{
    try {
        const user = req.user;
        const imageUrl = user.image
            ? `/img/${user.image}`
            : '/img/default-profile.png';

        res.render('editProfile', {
            user: req.user,
            imageUrl: imageUrl,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.error(error);
    }
})


router.post('/edit', ensureAuthentication, csrfProtection, profileController.updateProfile);
router.post('/delete', ensureAuthentication, csrfProtection, profileController.deleteAccount);




module.exports = router