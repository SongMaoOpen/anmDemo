// import third party library
var mongoose = require('mongoose');
var async = require('async');

// import model
var Tasks = require('../../db_modules/models/tasks');
var Users = require('../../db_modules/models/users');
// import helper
var ResponseHelper = require('../helper/ResponseHelper');
var MongoHelper = require('../helper/MongoHelper');
var ServerError = require('../ServerError');

var task = {
    rootPath: 'task',
    actions: {}
};



task.actions.createTask = {
    path: 'createTask',
    method: 'post',
    execute: function(req, res) {
        var param = req.body;
        var name = param.name || '';


        if (name.length === 0) {
            ResponseHelper.buildResponse(res, ServerError.NotEnoughParam);
            return;
        }

        async.waterfall([function(callback) {
            var task = new Tasks({name: name});
            task.save(function(error, task) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, task);
                }
            });
        }, function(task, callback) {
            req.session.name = task._id;
            callback(null, task);
        }], function(error, task) {
            ResponseHelper.buildResponse(res, error, task);
        });
    }
};


// export module
module.exports = task;
