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
    admin: Boolean,
    email: String,
    age: Number,
    answers: []
});

var User = mongoose.model('User_Collection', userSchema);

/*
* *
* *
* *
* *
* *
* TO DO: ANSWERS IMPLEMENTATION
*
* */

exports.index = function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('index', {
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
        admin: req.body.admin,
        email: req.body.email,
        age: req.body.age
    });
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
            person: person
        });
    });
};

exports.editPerson = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        user.usernamename = req.body.username;
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
        res.redirect('/');
    });
};