// import thrid party library
var mongoose = require('mongoose');
var async = require('async');
var jwt = require('jsonwebtoken');
var logger = require('../../runtime/logger').getLogger();

// import model
var Users = require('../../db_modules/models/users');

// import helper
var ResponseHelper = require('../helper/ResponseHelper');

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

                    logger.debug('user token', {
                        id: user._id,
                        token: user.token
                    });

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

module.exports = authorize;
