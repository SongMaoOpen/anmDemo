// import third party library
var mongoose = require('mongoose');
var async = require('async');

// import model
var Users = require('../../db_modules/models/users');

// import helper
var ResponseHelper = require('../helper/ResponseHelper');
var MongoHelper = require('../helper/MongoHelper');
var ServerError = require('../ServerError');

var user = {
    rootPath: 'user',
    actions: {}
};

user.actions.login = {
    path: 'login',
    method: 'put',
    execute: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        Users.findOne({
            username: username
        }, function(error, user) {
            if (error) {
                // mongo error
                ResponseHelper.buildResponse(res, error);
            } else if (user === null) {
                // user not exists
                ResponseHelper.buildResponse(res, ServerError.ERR_INVALID_USER);
            } else {
                req.session.userId = user._id;
                // success
                ResponseHelper.buildResponse(res, null, user);
            }
        });
    }
};

user.actions.signup = {
    path: 'signup',
    method: 'post',
    execute: function(req, res) {
        var param = req.body;
        var mail = param.email || '';
        var username = param.username || '';
        var password = param.password || '';

        if (mail.length === 0 || username.length === 0 || password.length === 0) {
            ResponseHelper.buildResponse(res, ServerError.NotEnoughParam);
            return;
        }

        async.waterfall([function(callback) {
            Users.findOne({
                username: username
            }, function(error, user) {
                if (error) {
                    callback(error);
                } else if (user) {
                    callback(ServerError.ERR_USER_IS_EXISTS);
                } else {
                    callback();
                }
            });
        }, function(callback) {
            var user = new Users({
                username: username,
                password: password,
                email: mail
            });

            user.save(function(error, user) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, user);
                }
            });
        }, function(user, callback) {
            req.session.userId = user._id;
            callback(null, user);
        }], function(error, user) {
            ResponseHelper.buildResponse(res, error, user);
        });
    }
};

user.actions.getMe = {
    path: '',
    method: 'get',
    permissionValidators: ['validateLogin'],
    execute: function(req, res) {
        var _id = MongoHelper.parseObjectId(req.session.userId);
        Users.findOne({
            _id: _id
        }, function(error, user) {
            if (error) {
                ResponseHelper.buildResponse(res, error);
            } else if (!user) {
                ResponseHelper.buildResponse(res, ServerError.ERR_NOT_LOGGED_IN);
            } else {
                ResponseHelper.buildResponse(res, null, user);
            }
        });
    }
};

// export module
module.exports = user;
