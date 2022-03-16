const router = require('express').Router();
const passport = require('passport')

/**
 * Logging out of the site, should be provider agnostic
 */
router.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/');
});

/**
 * Authentication with Google
 */
router.get('/google', passport.authenticate('google', {

    /**
     * What imformation do we want from google. Selecting profile so I am able to grab name and id
     */
    scope: ['profile']
}));

/**
 * Callback route for google
 */
router.get('/google/redirect', passport.authenticate('google') ,(req, res) =>{
    
    res.redirect('/dashboard/');
})

module.exports = router;