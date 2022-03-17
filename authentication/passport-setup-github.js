const passport = require('passport');
const GithubStrategy = require('passport-github2');
const keys = require('../keys');
const User = require('../models/user-model');




/**
 * Out Custom Strategy for google logins
 */
 var strat = new GithubStrategy({

    /**
     * Retrieving the clientID and clientSecret from hidden files.  Spooky.
     */
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,

    /**
     * Declaring out call back URL
     */
    callbackURL: keys.callBackURL
    

    /**
     * This fucntion is called when the abve strategy completes
     */
}, (accessToken, refreshToken, profile, done)=>{

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
            done(null, currUser);
        }else{

            /**
             * A user was not found, will add them to the database
             */
            new User({
                site_Id: profile.id,
                name: profile.displayname
            }).save().then((newUser) => {
                console.log('new user crated: ' + newUser);
                done(null, newUser);
            })
        }

    });
    



    
});

module.exports = strat