var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'), 
    expressSession = require('express-session'),
    hash;

const saltRounds = 7;

var app = express();

app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true})); 

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', function(req, res){
  res.render("index");
});
app.post('/', urlencodedParser, function (req, res) { 
    console.log(req.body.username); 
    if (req.body.username == 'admin' && req.body.password == 'pass') { 
        req.session.user = { isAuthenticated: true, username: req.body.username}; 
        res.redirect('/admin'); 
    } else { 
        // logout here so if the user was logged in before, it will log them out if user/pass wrong 
        res.redirect('/'); 
    } 
}); 


app.get('/create', function(req, res){
  res.render("create.pug");
});

app.get('/admin', function(req, res){
    res.render('admin');
});

app.listen(3000);

//CONFUSED ON IMPLEMENTATION
//HOW TO PASS IN PASSWORD
//HOW TO RUN WHEN NEEDED AND IGNORE WHEN NOT
// bcrypt.hash(userPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });