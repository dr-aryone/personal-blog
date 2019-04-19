const mongoose = require('mongoose');
const db = require('../config/keys').MongoURI;

module.exports = function () {

    mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected..."))
    .catch(err => console.log(err));
}


