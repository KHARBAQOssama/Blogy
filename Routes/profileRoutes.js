const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require('../Middlewares/authMiddleware')
const profileController = require('../Controllers/profileController')

router.get('/pedit', ensureAuthentication, (req, res)=>{
    try {
        const user = req.user;
        const imageUrl = user.image
            ? `/img/${user.image}`
            : '/img/default-profile.png';

        res.render('editProfile', {
            user: req.user,
            imageUrl: imageUrl,
        });
    } catch (error) {
        console.error(error);
    }
})


router.post('/edit', ensureAuthentication, profileController.updateProfile);
router.post('/delete', ensureAuthentication, profileController.deleteAccount);


module.exports = router