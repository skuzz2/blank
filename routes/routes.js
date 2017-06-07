var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {});

function comparePass(inputedPassword, hash, req, appRes, isAdmin){
    bcrypt.compare(inputedPassword, hash, function(err, res) {
        console.log(res);
        console.log('Done comparing');
        if(isAdmin){
            adminLogin(req, appRes, res);
        }else{
            userLogin(req, appRes, res);
        }
        
    });
}

function encryptPass(password, user){
    var hash;
    bcrypt.hash(password, bcrypt.genSaltSync(), null, function(err, hash) {
        done(hash, user);
    });
}

function done(hash, user){
    user.password = hash;
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.username + ' added');
    });
}

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: String,
    email: String,
    age: String,
    answerOne: String,
    answerTwo: String,
    answerThree: String
});

var User = mongoose.model('User_Collection_Two', userSchema);

var allData = [0,0,0,0,0,0,0,0,0,0,0,0,0];

function resetData(){
    allData = [
        0,0,0,0,0,0,0,0,0,0,0,0,0
    ];
}

exports.getIndex = function(req, res){
    resetData();
    User.find(function(err, user){
        allData[12] = user.length;
        if (err) return console.error(err);
        for(var x = 0; x < user.length; x++){
            console.log(user[x].answerOne);
            switch(user[x].answerOne){
                case "Panda":
                    allData[0] += 1;
                    break;
                case "Ferret":
                    allData[1] += 1;
                    break;
                case "Crocodile":
                    allData[2] += 1;
                    break;
                case "Cat":
                    allData[3] += 1;
                    break;
            }
            switch(user[x].answerTwo){
                case "Red":
                    allData[4] += 1;
                    break;
                case "Purple":
                    allData[5] += 1;
                    break;
                case "Chartreuse":
                    allData[6] += 1;
                    break;
                case "Orange":
                    allData[7] += 1;
                    break;
            }
            switch(user[x].answerThree){
                case "Spaghetti":
                    allData[8] += 1;
                    break;
                case "Cheeseburger":
                    allData[9] += 1;
                    break;
                case "Tacos":
                    allData[10] += 1;
                    break;
                case "Ice Cream":
                    allData[11] += 1;
                    break;
            }
        }
        console.log(allData);
        res.render('index', {
            allData : allData
        });
    });
};

function adminLogin(req, res, isValid){
    if(isValid){
      console.log("Admin login thingy");
      req.session.user = { isAuthenticated: true, username: req.body.username}; 
      res.redirect('/admin');
    } else { 
      console.log('Logout');
      // logout here so if the user was logged in before, it will log them out if user/pass wrong 
      res.redirect('/logout'); 
    }
}

function userLogin(req, res, isValid){
    if(isValid){
      console.log("User login thingy");
      req.session.user = { isAuthenticated: false, username: req.body.username}; 
      res.redirect('/user');
    } else { 
      console.log('Logout');
      // logout here so if the user was logged in before, it will log them out if user/pass wrong 
      res.redirect('/logout'); 
    }
}

exports.index = function(req, res) {
  if(req.body.username === 'admin'){
    User.findOne({'username': 'admin'}, 'password', function (err, User) {
      if (err) return handleError(err);
        comparePass(req.body.password, User.password, req, res, true);
      });
  } else {
     User.findOne({'username': req.body.username}, 'password', function (err, User) {
      if (err) return handleError(err);
        comparePass(req.body.password, User.password, req, res, false);  
      });   
  }
};

exports.admin = function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('admin', {
            title: 'User List',
            people: user
        });
    });
};

exports.create = function (req, res) {
    res.render('create', {
        title: 'Add User'
    });
};

exports.createUser = function (req, res) {
    var level = 'user';
    if(req.body.username == 'admin'){
        level = 'admin';
    }
    console.log('Intial user creation');
    var user = new User({
        username: req.body.username,
        password: '',
        admin: level,
        email: req.body.email,
        age: req.body.age,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree
    });
    encryptPass(req.body.password, user);
    res.redirect('/');
};

exports.edit = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('edit', {
            title: 'Edit Person',
            person: user
        });
    });
};

exports.editUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);        
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.age = req.body.age;
        user.save(function (err, user) {
            if (err) return console.error(err);
            console.log(req.body.username + ' updated');
        });
    });
    res.redirect('/');
};

exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.redirect('/admin');
    });
};

exports.user = function (req, res) {
  User.findOne({'username': req.session.user.username}, function (err, User) {
      if (err) return handleError(err);
      res.render('user', {
        id: User.id,
        username: User.username,
        password: User.password,
        age: User.age,
        email: User.email,
        answerOne: User.answerOne,
        answerTwo: User.answerTwo,
        answerThree: User.answerThree
      });
  });
};