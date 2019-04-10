const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        // create variable name that contains users name to be used on the dashboard
        name: req.user.name
    });
})

module.exports = router;