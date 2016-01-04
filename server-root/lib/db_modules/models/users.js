// import thirid party library
var mongoose = require('mongoose');

// Define users's model
module.exports = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    email: String
}));
