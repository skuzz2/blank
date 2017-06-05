var express = require('express'),
    cookieParser = require('cookie-parser');

var user;
var date = Date();

var app = express();
app.use(cookieParser());
 
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
});


