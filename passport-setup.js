const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('./models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {

    User.findById(id).then((user) => {
        done(null, user);
    });
    
});

passport.use(new GoogleStrategy({

        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: '/auth/google/redirect'
        

        /**
         * This fucntion is called when the abve strategy completes
         */
    }, (accessToken, refreshToken, profile, done)=>{

        console.log(profile);

        //Checking if user is already in Database
        User.findOne({googleId: profile.id }).then((currUser) => {

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
                    googleId: profile.id,
                    name: profile.name.givenName
                }).save().then((newUser) => {
                    console.log('new user crated: ' + newUser);
                    done(null, newUser);
                })
            }

        });
        



        
}));