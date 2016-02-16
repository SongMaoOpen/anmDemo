var mongoose = require('mongoose');
var async = require('async');
var ServerError = require('../ServerError');

var MongoHelper = module.exports;

MongoHelper.parseObjectId = function(string) {
    return string === undefined ? undefined : new mongoose.Types.ObjectId(string);
};

MongoHelper.queryPaging = function(query, queryCount, pageNo, pageSize, callback) {
    async.waterfall([function(callback) {
        queryCount.count(function(error, count) {
            if (error) {
                callback(ServerError.getUnKnownError(error));
            } else {
                if (pageNo * pageSize >= count) {
                    callback(null, []);
                } else {
                    callback(null, count);
                }
            }
        });
    }, function(count, callback) {
        query.skip(pageNo * pageSize).limit(pageSize).exec(function(err, models) {
            if (err) {
                callback(ServerError.getUnKnownError(err));
            } else {
                callback(err, models, count);
            }
        });
    }], callback);
};
