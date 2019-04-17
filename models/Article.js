const mongoose = require('mongoose');

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
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 5000,
    },
});


const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;