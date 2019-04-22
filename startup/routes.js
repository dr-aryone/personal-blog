const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const { router } = require("../routes/images");
const session = require('express-session');
const flash = require('connect-flash');
const app = new express();
const passport = require('passport');
//Passport config
require('../config/passport')(passport);



module.exports = function(app) {

    //Bodyparser
    app.set("view engine", "ejs");
    app.use(expressLayouts);
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride('_method'))
    // Express session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }))
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    app.use('/', require('../routes/index'));
    app.use("/users", require("../routes/users"));
    app.use('/api/articles', require('../routes/articles'));
    app.use('/images', router);
    app.use(express.json());
    app.use(express.static('public'));
 

}
