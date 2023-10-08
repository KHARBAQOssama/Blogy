const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require('../Middlewares/authMiddleware')
const profileController = require('../Controllers/profileController')

router.get('/pedit', ensureAuthentication, (req, res)=>{
    res.render('editProfile', {
        user: req.user
    })
})


router.post('/edit', ensureAuthentication, profileController.updateProfile);

module.exports = router