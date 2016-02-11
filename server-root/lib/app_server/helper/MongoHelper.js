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
                callback(ServerError.getUnknowError(error));
            } else {
                if ((pageNo - 1) * pageSize >= count) {
                    callback(errors.ERR_PAGE_IS_NOT_EXISTS);
                } else {
                    callback(null, count);
                }
            }
        });
    }, function(count, callback) {
        query.skip((pageNo - 1) * pageSize).limit(pageSize).exec(function(err, models) {
            if (err) {
                callback(errors.genUnkownError(err));
            } else {
                callback(err, models, count);
            }
        });
    }], callback);
};
