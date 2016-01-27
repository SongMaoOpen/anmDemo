// import third party library
var mongoose = require('mongoose');
var async = require('async');
var jwt = require('jsonwebtoken');
// import model
var Tasks = require('../../db_modules/models/tasks');
var Users = require('../../db_modules/models/users');
// import helper
var ResponseHelper = require('../helper/ResponseHelper');
var MongoHelper = require('../helper/MongoHelper');
var ServerError = require('../ServerError');
var RUserCreateTasks = require('../../db_modules/models/rUserCreateTasks');
var task = {
    rootPath: 'task',
    actions: {}
};

task.actions.createTask = {
    path: 'createTask',
    method: 'post',
	permissionValidators: ['validateLogin'],
    execute: function(req, res) {
		var name = req.body.name || '';
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
            var rUserCreateTasks = new RUserCreateTasks({
                targetRef: task._id,
                initiatorRef: MongoHelper.parseObjectId(req.body.userId)
            });			
            rUserCreateTasks.save(function(error, rUserCreateTasks) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, task);
                }
            });
        }], function(error, task) {
            ResponseHelper.buildResponse(res, error, task);
        });
    }
};

task.actions.updateTask = {
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
task.actions.show = {
    path: 'show',
    method: 'post',
    execute: function(req, res) {
        async.waterfall([function(callback) {
                       
        }, function(user, callback) {
            var task = rUserCreateTasks.findOne({'initiatorRef': req.body.userId}).populate('targetRef');
        }], function(error) {
            ResponseHelper.buildResponse(res, error, task);
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
