const mongoose = require('mongoose');
const db = require('../config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected..."))
    .catch(err => console.log(err));


