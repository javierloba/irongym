const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

module.exports = (app) => {
    passport.serializeUser((user, cb) => {
        cb(null, user._id)
    })
    passport.deserializeUser((id, cb) => {
        User.findById(id)
        .then (user => cb(null, user))
        .catch((error) => cb(error))
    })
    app.use(flash())
// passReqToCallback: true es un default, para pasar otros datos del modelo se tiene que reconfigurar así:
    passport.use(new LocalStrategy ({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
        },
        (req, email, password, next) => {
        User.findOne({email})
        .then(user => {
            if(!user) {
                console.log("passport.config linea 26")
                return next(null, false, {message: "User or password incorrect"});
            }
            if(bcrypt.compareSync(password, user.password)){
                console.log("passport.config linea 30")
                return next(null, user);
            } else {
                console.log("passport.config linea 33")
                return next(null, false, { message: "User or password incorrect"})
            }
        })
        .catch(error => next(error))
    }))
    app.use(passport.initialize());
    app.use(passport.session());
}