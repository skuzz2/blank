var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

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

exports.index = function(req, res) {
  if(req.body.username === 'admin'){
    User.findOne({'username': 'admin'}, 'password', function (err, User) {
      if (err) return handleError(err);
        if(req.body.password === User.password){
          req.session.user = { isAuthenticated: true, username: req.body.username}; 
          res.redirect('/admin');
        } else { 
          // logout here so if the user was logged in before, it will log them out if user/pass wrong 
          res.redirect('/logout'); 
        }
      });
  } else {
     User.findOne({'username': req.body.username}, 'password', function (err, User) {
      if (err) return handleError(err);
        if(req.body.password === User.password){
          req.session.user = { isAuthenticated: false, username: req.body.username}; 
          res.redirect('/user');
        } else { 
          // logout here so if the user was logged in before, it will log them out if user/pass wrong 
          res.redirect('/logout'); 
        }
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
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: "user",
        email: req.body.email,
        age: req.body.age,
        answerOne: req.body.answerOne,
        answerTwo: req.body.answerTwo,
        answerThree: req.body.answerThree
    });
    console.log(user.answerOne);
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');
    });
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
        user.admin = req.body.admin;
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
//    User.findOne({'username': req.session.user.username}, function (err, user) {
//         if (err) return console.error(err);
//         res.render('user', {
//             title: 'User Info',
//             people: user
//         });
//     });

    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('user', {
            title: 'User Info',
            person: user
        });
    });
};