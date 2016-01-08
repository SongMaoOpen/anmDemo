var async = require('async');
var _ = require('underscore');

var ServerError = require('../ServerError');
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
                next(new ServerError(err));
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
        if (req.currentUserId) {
            callback(null);
        } else {
            callback(ServerError.ERR_NOT_LOGGED_IN);
        }
    }
};

module.exports = _init;
