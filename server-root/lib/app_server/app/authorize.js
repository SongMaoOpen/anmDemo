// import thrid party library
var mongoose = require('mongoose');
var async = require('async');
var jwt = require('jsonwebtoken');
var logger = require('../../runtime/logger').getLogger();

// import model
var Users = require('../../db_modules/models/users');

// import helper
var ResponseHelper = require('../helper/ResponseHelper');
var ServerError = require('../ServerError');

var authorize = {
    rootPath: 'authorize',
    actions: {}
};

authorize.actions.login = {
    path: '',
    method: 'post',
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
                if (user.password === password) {
                    var token = jwt.sign({
                        user: user._id
                    }, global.config.authorize.token.secret, {
                        issuer: global.config.authorize.token.issuer,
                        expiresIn: global.config.authorize.token.expiresIn
                    });

                    logger.debug('user._id[', user._id, '], token:[', token, ']'); 

                    user.token = token;
                    user.save(function(error, user) {
                        if (error) {
                            // mongo error
                            ResponseHelper.buildResponse(res, error);
                        } else {
                            ResponseHelper.buildResponse(res, null, {
                                token: user.token
                            });
                        }
                    });
                } else {
                    ResponseHelper.buildResponse(res, ServerError.ERR_INVALID_USER);
                }
            }
        });
    }
};

authorize.actions.refresh = {
    path: 'refresh',
    method: 'post',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
            // generate token
            var token = jwt.sign({
                user: req.body.userId
            }, global.config.authorize.token.secret, {
                issuer: global.config.authorize.token.issuer,
                expiresIn: global.config.authorize.token.expiresIn
            });

            async.waterfall([function(callback) {
                Users.findOne({
                    _id: MongoHelper.parseObjectId(req.body.userId)
                }, function(error, user) {
                    if (error) {
                        callback(error);
                    } else if (user) {
                        callback(ServerError.ERR_USER_IS_NOT_EXISTS);
                    } else {
                        callback(null, user);
                    }
                });
            }, function(user, callback) {
                user.token = token;
                user.save(function(error, user) {
                    callback(error, user);
                });
            }], function(error) {
                ResponseHelper.buildResponse(res, error, {
                    token: token
                });
            });
        }
    ]
};

authorize.actions.logout = {
    path: 'logout',
    method: 'post',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
            async.waterfall([function(callback) {
                Users.findOne({
                    _id: MongoHelper.parseObjectId(req.body.userId)
                }, function(error, user) {
                    if (error) {
                        callback(error);
                    } else if (user) {
                        callback(ServerError.ERR_USER_IS_NOT_EXISTS);
                    } else {
                        callback(null, user);
                    }
                });
            }, function(user, callback) {
                user.token = null;
                user.save(function(error, user) {
                    callback(error, user);
                });
            }], function(error) {
                ResponseHelper.buildResponse(res, error, {});
            });
        }
    ]
};

module.exports = authorize;
