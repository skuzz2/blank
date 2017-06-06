var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'), 
    expressSession = require('express-session'),
    hash,
    user,
    date = Date(),
    question_data = require('./questions.json');

const saltRounds = 7;

var app = express();

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

function toHash(my_str) {
    bcrypt.hash(my_str, null, null, function (err, hash) {
        outputhash(hash);
    });
}

function outputHash(my_str){
    console.log(my_str);
}

//CONFUSED ON IMPLEMENTATION
//HOW TO PASS IN PASSWORD
//HOW TO RUN WHEN NEEDED AND IGNORE WHEN NOT
// bcrypt.hash(userPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true})); 

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', urlencodedParser, route.index) 
app.get('/logout', function (req, res) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });

});

app.get('/create', function(req, res){
    res.render('create', {
        questions: question_data
    });
});

app.post('/create', urlencodedParser, route.createUser);
app.get('/admin', checkAuth, route.admin);
app.get('/delete/:id', route.delete);
app.get('/edit/:id', route.edit);
app.post('/edit/:id', route.editUser);
app.get('/user/:id', route.user);


app.get('/user', checkAuth, function (req, res) {
    user = req.session.user.username;
    res.cookie('user', user).send('cookie set');
    res.cookie('date', date).send('cookie set');
});

app.listen(3000);