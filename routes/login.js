const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Login_Page
router.get('/', forwardAuthenticated,(req, res) =>
  res.render('adminLogin')
);

// Login_Page
router.get('/home', ensureAuthenticated,(req, res) =>
  res.render('home')
);

// Register
router.post('/register', (req, res) => {
  const {
    username,
    password,
    password2,
  } = req.body;

  let errors = [];

  if (
    !username ||
    !password ||
    !password2
  ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register_col_admin', {
      errors,
      username,
      password,
      password2,
    });
  } else {
    User.findOne({ username : username }).then((user) => { //findOne is a promise
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register_col_admin', {
          errors,
          username,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          password,
          username,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect('/home');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});



// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true,
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Session ended! You are logged out');
    res.redirect('/');
  });
  
  // accout_settings
  router.get('/accDetails', ensureAuthenticated, (req, res) =>
    User.find()
      .then((admin) => {
        res.render('accountDetails', { user: admin });
      })
      .catch((err) => {
        res.status(500).send({
          error: 'Could not retrive data',
          err,
        });
      })
  );
  
  module.exports = router;