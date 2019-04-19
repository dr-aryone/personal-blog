// this catches promise rejections so we dont need to use try catch blocks - must be at top of file
require('express-async-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//Passport config
require('./config/passport')(passport);
require('dotenv').config();
const winston = require('winston');


// handle uncaught exceptions that happen outwith express 
process.on('uncaughtException', (ex) => {
console.log('We got an uncaught exception')
winston.error(ex.message, ex);
process.exit(1);
});


// handle unhandled promise rejections that happen outwith express 
process.on('unhandledRejection', (ex) => {
console.log('We got an unhandled rejection')
winston.error(ex.message, ex);
process.exit(1);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });

const app = new express();


// MIDDLEWARE //
app.use(express.json());
//EJS templating - the master template is layout.ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
//Bodyparser
app.use(express.urlencoded({ extended: false }));
// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect flash - flash allows you to display success and error messages
app.use(flash());
//Global Variables - set error messages to variables here
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");

    next();
});

app.use(express.static('public'));

// External routes
app.use('/', require('./routes/index'));
app.use("/users", require("./routes/users"));
app.use('/api/articles', require('./routes/articles'));



// DB Config
const db = require('./config/keys').MongoURI;
//connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected..."))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));