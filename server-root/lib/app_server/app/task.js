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
var RUserCreateTasks = require('../../db_modules/models/rUserCreateTasks');
var user = require('./user');
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
			var taskId = task._id;
			var user = new Users({username: username});
			var userId = user._id;
            var rUserCreateTasks = new RUserCreateTasks({
				targetRef: {type: taskId, ref:'tasks'}, initiatorRef: {type:userId, ref:'users'}});			
            rUserCreateTasks.save(function(error, rUserCreateTasks) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, rUserCreateTasks);
                }
            });

			var s = rUserCreateTasks;
			
			
            task.save(function(error, task) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, task);
                }
            });
        }, function(task, callback) {
            callback(null, task);			
        }], function(error, task) {
            ResponseHelper.buildResponse(res, error, task);
        });
    }
};

task.actions.updataTask = {
	path: '',
    method: 'put',
	execute: function(req, res) {
		var _id = MongoHelper.parseObjectId(req.session.taskId);
		Tasks.findOne({
            _id: _id
        }, function(error, task) {
            if (error) {
                ResponseHelper.buildResponse(res, error);
            } else if (!task) {
                ResponseHelper.buildResponse(res, ServerError.ERR_NOT_LOGGED_IN);
            } else {
                ResponseHelper.buildResponse(res, null, task);
            }
        });
		
	}
};
task.actions.getMe = {
    path: '',
    method: 'get',
    permissionValidators: ['validateLogin'],
    execute: function(req, res) {
        var _id = MongoHelper.parseObjectId(req.session.taskId);
        Users.findOne({
            _id: _id
        }, function(error, task) {
            if (error) {
                ResponseHelper.buildResponse(res, error);
            } else if (!user) {
                ResponseHelper.buildResponse(res, ServerError.ERR_NOT_LOGGED_IN);
            } else {
                ResponseHelper.buildResponse(res, null, task);
            }
        });
    }
};
// export module
module.exports = task;
