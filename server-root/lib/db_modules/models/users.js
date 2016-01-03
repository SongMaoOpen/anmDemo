// import thirid party library
var mongosee = require('mongosee');

// Define users's model
module.exports = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
