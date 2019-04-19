const session = require('express-session');
const express = require('express');
const app = new express();
const passport = require('passport');
//Passport config
require('../config/passport')(passport);

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());