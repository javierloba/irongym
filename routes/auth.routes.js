const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middlewares')
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const saltRounds = 10;

//gets the data from signup view and renders it
router.get('/signup', (req, res) => {
  res.render('signup');
})

//sends data to DB to create new user
router.post('/signup', (req, res) => {

  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.render('signup', {errorMessage: "name, email and password are required"})
  }

  if (password.length < 3){
    res.render('signup', {errorMessage: "Password should be at least 3 characters"})
  }

  User.findOne({ email })
  .then(user => {
    if (user) {
      return res.render('signup', {errorMessage: "User already exists"})
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt)

    User.create({ name, email, password: hashPass})
      .then((newUser) => {
        req.login(newUser, (error) => {
          if (error) {
            next(error)
          }
          return res.redirect('/private/profile')
        })
      })
      .catch((error) => {
        return res.render('signup', {errorMessage: 'Server error. Try again later'})
      })
  })
});


//get data from login view and renders it

router.get('/login', (req, res) => {
  res.render('login', {message: req.flash('error')[0]})
})

//send data to DB to login with user authentication

router.post('/login', passport.authenticate('local', {
  successRedirect: '/private/profile',
  failureRedirect: '/auth/login',
  failureFlash: true,
  passReqToCallback: true
}));

//get data from logout and redirect user to home page
router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
})

module.exports = router;