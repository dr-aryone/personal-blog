const express = require("express");
const expressLayouts = require("express-ejs-layouts");

module.exports = function(app) {

    //Bodyparser
    app.set("view engine", "ejs");
    app.use(expressLayouts);
    app.use(express.urlencoded({ extended: false }));
    app.use('/', require('../routes/index'));
    app.use("/users", require("../routes/users"));
    app.use('/api/articles', require('../routes/articles'));
    app.use(express.json());
    app.use(express.static('public'));


    
}
