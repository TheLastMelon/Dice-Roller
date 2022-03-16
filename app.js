const express = require('express');
const passport = require('passport')
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passPortSetup = require('./passport-setup')
const mongoose = require('mongoose');
const keys = require('./keys');
const cookieSession = require('cookie-session')

const app = express();

//Setting out View Engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 *60 * 1000,
    keys: [keys.session.cookieKey]
}))

/**
 * Initialize Passport
 */
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoDBURI, () => {
    console.log('Connected to MongoDB')
});

app.use('/auth',authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(3020);

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

//This is oue home page
app.get('/', function(req, res){
    res.render('index', {user: req.user});
});