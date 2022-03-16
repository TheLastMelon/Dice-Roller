const router = require('express').Router();
const passport = require('passport')

//Logging out of the site
router.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/');
});

//Authentication with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//Callback route for google
router.get('/google/redirect', passport.authenticate('google') ,(req, res) =>{
    //res.send(req.user);
    res.redirect('/dashboard/');
})

module.exports = router;