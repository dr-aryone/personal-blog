const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
//article model
const { Article, validate } = require("../models/Article");
const Joi = require('joi');

router.get('/', async (req, res) => {
    const articles = await Article.find().sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render('home', {
        articles: articles,
    });
})



// ensureAuthenticated, is required to auth the page
router.get('/dashboard', async (req, res) => {
    const articles = await Article.find().sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render('dashboard', {
        articles: articles,
    });


})


router.get('/blogs', async (req, res) => {
    const articles = await Article.find().sort('-time');
    if (!articles) return res.status(400).send("Oops, something went wrong");
    res.render('blogs', {
        articles: articles,
    })
})

router.get('/about', (req, res) => {
    res.render('about');
})


router.get('/blog-article/:title', async (req, res) => {
    const title = req.params.title.split('-').join(' ');
    const article = await Article.findOne({ title: title});
    if(!article) return res.status(404).send("Article not found");

    res.render('blog-article', {
        article: article
    });
})









module.exports = router;