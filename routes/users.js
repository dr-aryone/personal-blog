const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//user model
const User = require("../models/User");

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});


// render register page
router.get("/register", (req, res) => {
  res.render("register");
});



//register handle - register form is a post request
router.post("/register", (req, res) => {
  // use destructuring to get variables from the request body
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords must match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // if there are errors do this
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation passed

    // check for existing user in database
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        console.log("aaaaaaah");
        //user already exists - render register page with error messages - send along all fields so correct ones are not lost on re-render
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //create a new user
        const newUser = new User({
          name,
          email,
          password,
        });

        //Hash password - this is the bcrypt stuff
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //save user to database
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});


// logout handle
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You logged out');
  res.redirect('/users/login');
})

module.exports = router;
