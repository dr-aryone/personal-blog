const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require('express-session');

//user model
const { User, validate } = require("../models/User");

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});


// render register page
router.get("/register", (req, res) => {
  res.render("register");
});



//register handle - register form is a post request
router.post("/register", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
    // check for existing user in database
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("This user already exists");

        //create a new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        //Hash password - this is the bcrypt stuff
        console.log(newUser);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
            
        //save user to database
        await newUser.save()
        const token = newUser.generateAuthToken();
        res.session.token = token;
        res.header('x-auth-token', token).redirect("/dashboard");

      });


// Login Handle
router.post("/login", async (req, res, next) => {
  
  
  // const user = await User.findOne({ email: req.body.email });
  // if (!user) return res.status(400).send("Email or password is incorrect");

  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send("Invalid email or password.");

  // const token = user.generateAuthToken();

  // res.set('x-auth-token', token).redirect('/dashboard');

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);

});


// logout handle
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
})

module.exports = router;
