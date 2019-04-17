const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
//article model
const { Article } = require("../models/Article");


// instantiate variables ready to receive data
let articleBody = [];
let articleTitle = [];
let articleAuthor = [];
let articleTime = [];
let articleID = [];

// wrap my database call functions in some middleware
function findAllArticles(req, res, next){ 


// retrieve the existing articles from the database
function getArticleQuery() {
    let query = Article.find();
    return query;
}

// want to move this to another file and import it in using require 
let query = getArticleQuery();
query.exec(function (err, results) {
    if (err)
        return console.log(err);

    for(var i = 0; i < results.length; i++) {
        let id = String(results[i]._id);
        if (!articleID.includes(id)) {
                articleID.push(id);
                articleTitle.push(results[i].title);
                articleBody.push(results[i].body);
                articleAuthor.push(results[i].author);
                articleTime.push(results[i].time);
        }
    }

    next();
});

}
router.get('/', findAllArticles, (req, res) => {
    res.render('home', {
        articleBody: articleBody,
        articleTitle: articleTitle,
        articleAuthor: articleAuthor,
        articleTime: articleTime

    });
})


// ensureAuthenticated, is required to auth the page
router.get('/dashboard',  findAllArticles, (req, res) => {

    res.render('dashboard', {
        // create variable name that contains users name to be used on the dashboard
        // name: req.user.name
        articleBody: articleBody,
        articleTitle: articleTitle,
        articleAuthor: articleAuthor,
        articleTime: articleTime
        
    });


})


router.get('/blogs', (req, res) => {
    res.render('blogs', {
        articleTitle: articleTitle,
        
    })
})

router.get('/about', (req, res) => {
    res.render('about');
})


router.get('/blog-article/*', (req, res) => {

    res.render('blog-article', {
        articleBody: articleBody,
        articleTitle: articleTitle,
        articleAuthor: articleAuthor,
        articleTime: articleTime,
        url: req.url
    });
})



// Save an article to mongodb
router.post('/post-article', (req, res) => {
    const { title, author, time, body } = req.body;
    let errors = []

    // Check required fields
    if (!title || !author || !time || !body) {
        errors.push({ msg: "Please fill in all fields" });
    }

    if (errors.length > 0) {
        console.log(req.body)
        res.render("dashboard", {
            errors,
            title,
            author,
            time,
            body,
        });
    } else {
    //Validation passed
        const newArticle = new Article({
            title,
            author,
            time,
            body,
        });

        //save user to database
        newArticle
            .save()
            .then(article => {
                req.flash(
                    "success_msg",
                    "You have posted a new article"
                );
                res.redirect("/");
            })
            .catch(err => console.log(err));
}


});

// Delete an article - how tf do i do this
router.post('/delete-article', (req, res) => {
    const { remove } = req.body;
    
    console.log(remove);


    res.redirect('/');
})




module.exports = router;