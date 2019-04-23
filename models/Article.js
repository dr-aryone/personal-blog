const mongoose = require('mongoose');
const Joi = require('joi');


const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    body: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 5000,
    },
    image: {
        type: String,
        required: true,
    }
});


function validateArticle(article) {
    const schema = {
        title: Joi.string().min(2).max(255).required(),
        author: Joi.string().min(2).max(255).required(),
        body: Joi.string().min(10).max(5000).trim().required(),
        image: Joi.string().required()
    }

    return Joi.validate(article, schema);
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports.Article = Article;
module.exports.validate = validateArticle;