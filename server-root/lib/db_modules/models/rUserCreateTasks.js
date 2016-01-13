var mongoose = require('mongoose');

module.exports = mongoose.model('RUserCreateTasks', new mongoose.Schema({
    initiatorRef: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    targetRef: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    },
    create: {
        type: Date,
        default: Date.now
    }
});
