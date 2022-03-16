const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    }else{
        next();
    }
}

router.get('/', authCheck, (req, res) =>{
    res.send('You are logged into the profile ' + req.user.id);
})

module.exports = router;