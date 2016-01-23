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
                email: mail,
                token: jwt.sign({
                    username: username
                }, global.config.authorize.token.secret, {
                    issuer: global.config.authorize.token.issuer,
                    expiresIn: global.config.authorize.token.expiresIn
                })
            });

            user.save(function(error, user) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, user);
                }
            });
        }], function(error, user) {
            ResponseHelper.buildResponse(res, error, {
                token: user.token
            });
        });
    }
};

user.actions.getMe = {
    path: '',
    method: 'get',
    permissionValidators: ['validateLogin'],
    execute: function(req, res) {
        var _id = MongoHelper.parseObjectId(req.body.userId);
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
