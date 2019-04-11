const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();



//article model
const Article = require("../models/Article");

// retrieve the existing articles from the database
function getArticleQuery(name) {
    let query = Article.find({ author: name });
    return query;
}

let articleBody;
let articleTitle;
let articleAuthor;
let articleTime;
let query = getArticleQuery('Jack F');
query.exec(function (err, results) {
    if (err)
        return console.log(err);
    results.forEach(function (result) {
        articleTitle = result.title
        articleBody = result.body;
        articleAuthor = result.author;
        articleTime = result.time
    });
});


router.get('/', (req, res) => {
    res.render('home');
})


// ensureAuthenticated, is required to auth the page
router.get('/dashboard', ensureAuthenticated, (req, res) => {

    res.render('dashboard', {
        // create variable name that contains users name to be used on the dashboard
        // name: req.user.name
        articleBody: articleBody,
        articleTitle: articleTitle,
        articleAuthor: articleAuthor,
        articleTime: articleTime
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





module.exports = router;