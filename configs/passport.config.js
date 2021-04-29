const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SlackStrategy = require('passport-slack-oauth2').Strategy;
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
                return next(null, false, {message: "User or password incorrect"});
            }
            if(bcrypt.compareSync(password, user.password)){
                return next(null, user);
            } else {
                return next(null, false, { message: "User or password incorrect"})
            }
        })
        .catch(error => next(error))
    }))

    passport.use('slack', new SlackStrategy({
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      callbackURL: "/auth/slack/callback"  
    },
    (accesToken, refreshToken, profile, done) =>{

        User.findOne({slackID: profile.id})
        .then( user  => {
            if(user) {
                done(null, user);
                return;
            }

            User.create({slackID: profile.id, name: profile.user.name, email: profile.user.email})
            .then( newUser => {
                done(null, newUser)
            })
            .catch(error => done(error))
        })
        .catch(error => done(error))
    }
    ))
    app.use(passport.initialize());
    app.use(passport.session());
}