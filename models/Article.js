const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    },
});


const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;