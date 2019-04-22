const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Joi = require('joi');
const methodOverride = require('method-override');
const { auth } = require('../middleware/auth');
const { upload } = require('../routes/images.js');
 
//article model
const { Article, validate } = require("../models/Article");

// Save an article to mongodb
router.post("/", upload.single("file"), ensureAuthenticated, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    const articles = await Article.find().sort("-time");
    res.status(400).render("dashboard", {
      articles: articles,
    });
  }
  //Validation passed
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    image: req.file.filename,
  });

  //save user to database
  await newArticle.save();

  const articles = await Article.find().sort("-time");
  res.render("dashboard", {
    articles: articles,
  });
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id.trim();
    const article = await Article.findOneAndDelete({ _id: id });
    if (!article) return res.status(404).send("This article does not exist");
    const articles = await Article.find().sort('-time');
    res.render('dashboard', {
        articles: articles
    });
})

module.exports = router;