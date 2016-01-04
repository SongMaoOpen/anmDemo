// import third party library
var mongoose = require('mongoose');

// import model
var Users = require('../../db_modules/models/users');

// import helper
var ResponseHelper = require('../helper/ResponseHelper');
var ServerError = require('../ServerError');

var user = {
    rootPath: 'user',
    actions: {}
};

user.actions.login = {
    path: 'login',
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
                // success
                ResponseHelper.buildResponse(res, null, user);
            }
        });
    }
};

// export module
module.exports = user;
