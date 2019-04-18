const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


//article model
const { Article, validate } = require("../models/Article");

router.get('/', async (req, res) => {
    const articles = await Article.find().sort('-time');
    res.send(articles);
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send("This article does not exist");
    res.send(article);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    console.log(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        body: req.body.author
    })

    try {
        const result = await article.save();
        res.send(result);
    } catch(ex) {
        res.send(ex.message);
    }

});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message);

    const article = await Article.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
    });
    if (!article) return res.status(404).send("This article does not exist");
    const result = await article.save();
    res.send(result);
})

router.delete('/:id', async (req, res) => {
    const article = await Article.findOneAndDelete({_id: req.params.id});
    if (!article) return res.status(404).send("This article does not exist");
    res.send(article);
})


module.exports = router;