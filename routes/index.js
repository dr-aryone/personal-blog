const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
})


// ensureAuthenticated, is required to auth the page
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        // create variable name that contains users name to be used on the dashboard
        // name: req.user.name
    });
})


// TO BE DONE 1111111111111111111111
// router.post('/article-posted', (req, res) => {

// })


module.exports = router;