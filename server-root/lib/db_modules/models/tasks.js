// import thrid party library
var mongoose = require('mongoose');

// Define user's model;

module.exports = mongoose.model('tasks', new mongoose.Schema({
    name: String,
    deadline: {
        type: Date,
        default: Date.now
    },
    create: {
        type: Date,
        default: Date.now
    }
});
