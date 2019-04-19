const flash = require('connect-flash');
const express = require("express");
const app = new express();

//Connect flash - flash allows you to display success and error messages
app.use(flash());
//Global Variables - set error messages to variables here
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});