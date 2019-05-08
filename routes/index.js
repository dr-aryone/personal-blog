const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
//article model
const { Article, validate } = require("../models/Article");
const Joi = require('joi');
const { auth } = require('../middleware/auth');
const { gfs } = require('../routes/images');

router.get('/', async (req, res) => {
    const articles = await Article.find().limit(3).sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render('home', {
        articles: articles,
        loggedIn: req.user
    });
})


// ensureAuthenticated, is required to auth the page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const articles = await Article.find().sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render("dashboard", {
      articles: articles,
      loggedIn: req.user,
    });
})


router.get('/blogs', async (req, res) => {
    const articles = await Article.find().sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render("blogs", {
      articles: articles,
      loggedIn: req.user,
    });
})

router.get('/about', (req, res) => {
    res.render("about", {
      loggedIn: req.user,
    });
})


router.get('/blogs/:title', async (req, res) => {
    const title = req.params.title.split('-').join(' ');
    const article = await Article.findOne({ title: title});
    if(!article) return res.status(404).send("Article not found");

    res.render('blog-article', {
        article: article,
        loggedIn: req.user

    });
})



module.exports = router;