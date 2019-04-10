module.exports = {

    findArticles:function(req, res, next) {

        const mongoose = require('mongoose');
        const MongoClient = require('mongodb').MongoClient;
        // DB Config
        const db = require('../config/keys').MongoURI;


        const client = new MongoClient(db, { useNewUrlParser: true });
        // //Connect to the DB
        client.connect(db => {
        
        //assign collection to variable
        const articles = client.db("test").collection("articles");

        articles.find({ author: "Jack F" }).toArray((err, res) => {
        if (err) throw err;

        console.log(res[0].body); 
        
        
        next();
    })
})

    }

}

