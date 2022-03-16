const router = require('express').Router();

/**
 * Checking if the req has a valid logged user, if not no access
 */
const authCheck = (req, res, next) => {
    if(!req.user){

        /**
         * If the user does not have access, redirect them to the main page
         */
        res.redirect('/');
    }else{

        /**
         * Calling the next Middleware
         */
        next();
    }
}

/**
 * The main dashboard for the users
 */
router.get('/', authCheck, (req, res) =>{
    res.send('You are logged into the profile ' + req.user.id);
})

/**
 * Making router avalable externally
 */
module.exports = router;