const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = new express();
require('dotenv').config();


//EJS templating - the master template is layout.ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected..."))
    .catch(err => console.log(err));



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

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));