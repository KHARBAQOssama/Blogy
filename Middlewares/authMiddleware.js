module.exports = {
    ensureAuthentication: function(req, res, next){
        if (req.isAuthenticated()){
            return next()
        }

        req.flash('error_message', "Forbidden Action for non authenticated users")
        res.redirect('/auth/login')
    }

}