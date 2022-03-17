const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys');
const User = require('../models/user-model');

const googlePassport = require('./passport-setup-google');
const githubPassport = require('./passport-setup-github');

/**
 * Serializing the User ID
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Deserializing the User
 */
passport.deserializeUser((id, done) => {

    User.findById(id).then((user) => {
        done(null, user);
    });
    
});

passport.use(googlePassport)
passport.use(githubPassport);