const passport = require('passport');
const SimpleLoginStrategy = require('passport-openidconnect').Strategy;
const keys = require('../keys');
const User = require('../models/user-model');




/**
 * Out Custom Strategy for google logins
 */
 var strat = new SimpleLoginStrategy({

    /**
     * Connection URL for SimpleLogin
     */
    issuer: 'https://app.simplelogin.io',
    authorizationURL: 'https://app.simplelogin.io/oauth2/authorize',
    tokenURL: 'https://app.simplelogin.io/oauth2/token',
    userInfoURL: 'https://app.simplelogin.io/oauth2/userinfo',

    /**
     * Retrieving the clientID and clientSecret from hidden files.  Spooky.
     */
    clientID: keys.simplelogin.clientID,
    clientSecret: keys.simplelogin.clientSecret,

    /**
     * Declaring out call back URL
     */
    callbackURL: keys.simplelogin.callBackURL
    

    /**
     * This fucntion is called when the abve strategy completes
     */
}, (issuer, profile, done)=>{

    console.log(profile);

    //Checking if user is already in Database
    User.findOne({site_Id: profile.id }).then((currUser) => {

        /**
         * Checking if the user has logged into the site previously. If there is a value, will return true, otherwise false
         */
        if(currUser){
            /**
             * A user was found!
             */
            console.log('User Was Found: ' + currUser);
            return done(null, currUser);
        }else{

            /**
             * A user was not found, will add them to the database
             */
            new User({
                site_Id: profile.id,
                name: profile.displayname
            }).save().then((newUser) => {
                console.log('new user crated: ' + newUser);
                return done(null, newUser);
            })
        }

    });
    



    
});

module.exports = strat