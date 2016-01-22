// import third module
var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');
var jwt = require('jsonwebtoken');

// import helper
var ServerError = require('../ServerError');
var MongoHelper = require('../helper/MongoHelper');

// db models
var Users = require('../../db_modules/models/users');

var _validatorsMap = {};

var _init = function(services) {
    services.forEach(function(service) {
        var fullpath = '/' + global.config.server.context + '/';
        if (service.rootPath != null && service.rootPath.length > 0) {
            fullpath += service.rootPath;
        }
        for (var key in service.actions) {
            var action = service.actions[key];
            var validators = action.permissionValidators;

            var actionPath = fullpath;
            if (action.path === null) {
                actionPath += '/' + key;
            } else if (action.path.length > 0) {
                actionPath += '/' + action.path;
            }

            if (validators) {
                _validatorsMap[actionPath] = validators;
            }
        }
    });
    return _validate;
};

var _validate = function(req, res, next) {
    var validators = _validatorsMap[req.path];
    if (validators) {
        var tasks = [];
        validators.forEach(function(validator) {
            tasks.push(function(callback) {
                if (_.isString(validator)) {
                    validator = _builtInValidators[validator];
                }
                validator(req, res, callback);
            });
        });
        async.series(tasks, function(err) {
            if (err) {
                next(err);
            } else {
                next();
            }
        });
    } else {
        next();
    }
};

var _builtInValidators = {
    'validateLogin': function(req, res, callback) {
        var authorization = req.header('Authorization');

        if (authorization == null || authorization.length === 0) {
            callback(ServerError.ERR_TOKEN);
            return;
        }

        var authHeaders = authorization.split(' ');
        if (authHeaders.length < 2 || authHeaders[0] !== 'Bearer') {
            callback(ServerError.ERR_TOKEN);
            return;
        }

        var token = authHeaders[1];

        jwt.verify(token, global.config.authorize.token.secret, {
            issuer: global.config.authorize.token.issuer
        }, (error, decode) => {
            if (error) {
                callback(ServerError.ERR_TOKEN);
                return;
            }

            Users.findOne({
                _id: MongoHelper.parseObjectId(decode.user),
            }, (error, user) => {
                if (error) {
                    callback(ServerError.ERR_TOKEN);
                    return;
                }

                if (user === null) {
                    callback(ServerError.ERR_TOKEN);
                    return;
                }

                if (user.token === token) {
                    req.body.userId = decode.user;
                    callback();
                } else {
                    callback(ServerError.ERR_NOT_LOGGED_IN);
                }
            });
        });
    }
};

module.exports = _init;
