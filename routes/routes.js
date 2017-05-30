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
* DON'T DUCK WITH ANYTHING BELOW THIS
* *
* *
* *
* *
*
* */

// exports.index = function (req, res) {
//     Person.find(function (err, person) {
//         if (err) return console.error(err);
//         res.render('index', {
//             title: 'People List',
//             people: person
//         });
//     });
// };

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

// exports.edit = function (req, res) {
//     Person.findById(req.params.id, function (err, person) {
//         if (err) return console.error(err);
//         res.render('edit', {
//             title: 'Edit Person',
//             person: person
//         });
//     });
// };
//
// exports.editPerson = function (req, res) {
//     Person.findById(req.params.id, function (err, person) {
//         if (err) return console.error(err);
//         person.firstname = req.body.firstname;
//         person.lastname = req.body.lastname;
//         person.age = req.body.age;
//         person.species = req.body.species;
//         person.victims = req.body.victims;
//         person.save(function (err, person) {
//             if (err) return console.error(err);
//             console.log(req.body.firstname + ' updated');
//         });
//     });
//     res.redirect('/');
//
// };
//
// exports.delete = function (req, res) {
//     Person.findByIdAndRemove(req.params.id, function (err, person) {
//         if (err) return console.error(err);
//         res.redirect('/');
//     });
// };
//
// exports.details = function (req, res) {
//     Person.findById(req.params.id, function (err, person) {
//         if (err) return console.error(err);
//         res.render('details', {
//             title: person.firstname + "'s Details",
//             person: person
//         });
//     });
// };