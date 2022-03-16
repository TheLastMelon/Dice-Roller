var express = require('express');

var app = express();

app.listen(3020);

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

app.get('/', function(req, res){
    res.render('index');
});