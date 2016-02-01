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
	path: 'updateTask',
    method: 'post',
	execute: function(req, res) {
        var _id = req.body._id;
        var name = req.body.name || '';
        var create = req.body.create || '';
        var deadline = req.body.deadline || '';
        if (name.length === 0 || create.length === 0 || deadline.length === 0) {
            ResponseHelper.buildResponse(res, ServerError.NotEnoughParam);
            return;
        } 
        
        Tasks.findOne({
            _id: _id
        }, function(error, task) {
            if (error) {
                ResponseHelper.buildResponse(res, error);
            } else if (!task) {
                ResponseHelper.buildResponse(res, ServerError.ERR_NOT_LOGGED_IN);
            } else {
                task.name = name;
                task.deadline = deadline;
                task.save(function(error, task) {
                    if (error) {
                        ResponseHelper.buildResponse(res, error);
                    } else {
                        ResponseHelper.buildResponse(res, null, task);
                    }
                })
            }
        });
    }
};

task.actions.remove = {
    path: 'remove',
    method: 'post',
    execute: function (req, res) {
        var taskId = req.body._id;
        var task = 'success';
        Tasks.remove({_id: taskId}).exec(function(error, task){
            ResponseHelper.buildResponse(res, error, task);
        });
    }
};

task.actions.show = {
    path: 'show',
    method: 'post',
    execute: function(req, res) {
        var _id = req.body._id;
        var pageNumber = req.body.num||1;
        var resultsPerPage = 5;
        var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
        RUserCreateTasks.find({'initiatorRef': _id}).populate('targetRef').exec(function(error, task){
            var tasks = {};
            for(var i = 0; i < task.length; i++){
                if (task[i].targetRef != null) {
                    console.log(task[i]);
                    tasks[i] = task[i].targetRef;
                }
            }
            ResponseHelper.buildResponse(res, error, tasks);
            console.log(tasks);
        });     
    }
};

task.actions.request = {
    path: 'request',
    method: 'post',
    execute: function(req, res) {
        var _id = req.body._id;
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
    execute: function(req, res) {
        var _id = req.body.taskId;
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
// export module
module.exports = task;
