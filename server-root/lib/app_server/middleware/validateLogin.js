// import third module
var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');
var jwt = require('jsonwebtoken');

// import helper
var ServerError = require('../ServerError');
var MongoHelper = require('../helper/MongoHelper');
var logger = require('../../runtime/logger').getLogger();

// db models
var Users = require('../../db_modules/models/users');

module.exports = function(req, res, next) {

    logger.debug('begin validate user login....');

    var authorization = req.header('Authorization');

    if (authorization == null || authorization.length === 0) {
        return next(ServerError.ERR_TOKEN);
    }

    var authHeaders = authorization.split(' ');
    if (authHeaders.length < 2 || authHeaders[0] !== 'Bearer') {
        return next(ServerError.ERR_TOKEN);
    }

    var token = authHeaders[1];

    jwt.verify(token, global.config.authorize.token.secret, {
        issuer: global.config.authorize.token.issuer
    }, (error, decode) => {
        if (error) {
            return next(ServerError.ERR_TOKEN);
        }

        Users.findOne({
            _id: MongoHelper.parseObjectId(decode.user),
        }, (error, user) => {
            if (error) {
                return next(ServerError.ERR_TOKEN);
            }

            if (user === null) {
                return next(ServerError.ERR_TOKEN);
            }

            if (user.token === token) {
                req.body.userId = decode.user;
                logger.debug('end validate user login....');
                next();
            } else {
                return next(ServerError.ERR_NOT_LOGGED_IN);
            }
        });
    });
};
