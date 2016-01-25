var mongoose = require('mongoose');

module.exports = mongoose.model('RUserCreateTasks', new mongoose.Schema({
    initiatorRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    targetRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    },
    create: {
        type: Date,
        default: Date.now
    }
}));
