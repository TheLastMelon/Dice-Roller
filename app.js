const express = require('express');
const passport = require('passport')
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passPortSetup = require('./authentication/passport-setup')
const mongoose = require('mongoose');
const keys = require('./keys');
const cookieSession = require('cookie-session')

/**
 * Initializing the Express App
 */
const app = express();

/**
 * Setting out View Engine
 */
app.set('view engine', 'ejs');

/**
 * Starting a Cookie Session, with a max life of 1 day
 * and pulls a secret from keys file
 */
app.use(cookieSession({
    maxAge: 24 * 60 *60 * 1000,
    keys: [keys.session.cookieKey]
}))

/**
 * Initialize Passport
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Initialize the connenction to the MongoDB
 */
mongoose.connect(keys.mongoDBURI, () => {
    console.log('Connected to MongoDB')
});

/**
 * When ever we have a '/auth' route, we pull from authRoutes 
 * to get the different locations. authRoute handles all the routing 
 * that uses the authentication methods
 */
app.use('/auth',authRoutes);

/**
 * When ever we have a '/dashboard' route, we pull from authRoutes 
 * to get the different locations. authRoute handles all the routing 
 * that uses the dashboard methods
 */
app.use('/dashboard', dashboardRoutes);

/**
 * We are loading in the assets for the website. Same methods as above
 */
app.use('/assets', express.static('assets'));

/**
 * We are loading images for the app, using the same methods as above
 */
app.use('/images', express.static('images'));

/**
 * The port for our app to listen on
 */
app.listen(443);



/**
 * Providing the home page for our app
 */
app.get('/', function(req, res){

    /**
     * Using EJS to provide the site, passing profile information on to the dynamic site
     */
    res.render('index', {user: req.user});
});