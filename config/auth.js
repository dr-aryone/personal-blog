module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
}

// this code is preventing you from accessing secure areas without a login - it must be passed in as middleware to the pages that need to be secured

