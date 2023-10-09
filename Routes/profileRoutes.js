const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require('../Middlewares/authMiddleware')
const profileController = require('../Controllers/profileController')

router.get('/pedit', ensureAuthentication, (req, res)=>{
    try {
        const user = req.user;
        const imageUrl = user.image
            ? `/images/${user.image}`
            : '/images/default-profile.png';

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