var mongoose = require('mongoose');

var MongoHelper = module.exports;

MongoHelper.parseObjectId = function(string) {
    return string === undefined ? undefined : new mongoose.Types.ObjectId(string);
};
