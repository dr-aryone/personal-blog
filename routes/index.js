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



// Save an article to mongodb
router.post('/post-article', async (req, res) => {
    const { error } = Joi.validate(req.body);
    if(error) return res.status(400).render('dashboard');
    //Validation passed
        const newArticle = new Article({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
        });

        //save user to database
        await newArticle.save()

        const articles = await Article.find().sort('-time');
        res.render("dashboard", {
            articles: articles
        });
});


router.delete('/:id', async (req, res) => {
    const article = await Article.findOneAndDelete({ _id: req.params.id });
    if (!article) return res.status(404).send("This article does not exist");
    res.send(article);
})


module.exports = router;