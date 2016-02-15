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

task.actions.create = {
    path: '',
    method: 'post',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
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
    ]
};

task.actions.update = {
    path: ':id',
    method: 'put',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
            var _id = req.params.id;
            var name = req.body.name || '';
            var deadline = req.body.deadline || '';
            if (name.length === 0) {
                ResponseHelper.buildResponse(res, ServerError.NotEnoughParam);
                return;
            }
            Tasks.findOne({
                _id: MongoHelper.parseObjectId(_id)
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
                    });
                }
            });
        }
    ]
};

task.actions.delete = {
    path: ':id',
    method: 'delete',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
            var taskId = MongoHelper.parseObjectId(req.params.id);
            async.waterfall([function(callback) {
                Tasks.remove({_id: taskId}).exec(function(error) {
                    callback(error);
                });
            }, function(callback) {
                RUserCreateTasks.remove({targetRef: taskId}).exec(function(error) {
                    callback(error);
                });
            }], function(error) {
                ResponseHelper.buildResponse(res, error, {});
            });
        }
    ]
};

task.actions.getAllByCurrentUser = {
    path: '',
    method: 'get',
    execute: [
        require('../middleware/validateLogin'),
        require('../middleware/parsePageParam'),
        function(req, res) {
            var _id = MongoHelper.parseObjectId(req.body.userId);
            var critrial = {
                initiatorRef: _id
            };
            MongoHelper.queryPaging(RUserCreateTasks.find(critrial).populate('targetRef').sort({create: -1}),
                    RUserCreateTasks.find(critrial), req.query.pageNo, req.query.pageSize, function(error, relations, count) {
                if (error) {
                    ResponseHelper.buildResponse(res, error);
                    return;
                }

                var tasks = [];
                relations.forEach(function(element) {
                    if (element.targetRef != null) {
                        tasks.push(element.targetRef);
                    }
                });
                ResponseHelper.buildResponse(res, null, tasks, {
                    'X-PageNo': req.query.pageNo,
                    'X-Count': count
                });
            });
        }
    ]
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

task.actions.getOne = {
    path: ':id',
    method: 'get',
    execute: [
        require('../middleware/validateLogin'),
        function(req, res) {
            var _id = MongoHelper.parseObjectId(req.params.id);
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
    ]
};
// export module
module.exports = task;
