const express = require("express");
const router = express.Router();

const passport = require('passport');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// require the user modell !!!
const User = require("../models/User");

router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser){
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy".
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    // req.login() is defined by passport
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // Send the user's information to the frontend
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { firstName, paternalLastName, email, password } = req.body;

  const isEmpty = [ 
    firstName,
    paternalLastName,
    email,
    password
  ].some(element => element === "");


  if (isEmpty) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    return;
  }

  User.findOne({ email })
  .then(user => {
    if (user !== null) {
      res.status(400).json({ message: 'E-mail taken.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      firstName,
      paternalLastName,
      email,
      password: hashPass
    })
    .then(newUser => {
      // Automatically log in user after sign up
      // req.login() is defined by passport
      req.login(newUser, err => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }
        // Send the user's information to the frontend
        res.status(200).json(newUser);
      });
    })
    .catch(() => {
      res.status(400).json({ message: 'Saving user went wrong.' });
    });
  })
  .catch(() => res.status(500).json({ message: "E-mail check went bad." }));
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
