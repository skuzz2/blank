var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));


var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', function(req, res){
  res.render("index");
});

app.get('/admin', function(req, res){
    res.render('admin');
});

app.listen(3000);