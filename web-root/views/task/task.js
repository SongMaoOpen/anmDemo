(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.task',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/task', {
            templateUrl: 'views/task/task.html',
            controller: 'taskController'
        });
    }]);

    // define controller
    app.controller('taskController', function($scope, $location, $http, config, $rootScope, userService, taskService) {

        // get task's resource
        var Task = taskService.getFactory();

        var getTasks = function() {
            Task.query({
                pageNo: $scope.pageInfo.pageNo - 1
            }, function(tasks, responseHeaders) {
                $scope.tasks = tasks;
                $scope.pageInfo = {
                    count: responseHeaders('X-TotalCount'),
                    pageNo: parseInt(responseHeaders('X-PageNo')) + 1
                };
            }, function(httpResponse) {
                if (httpResponse.status === 401) {
                    $location.path('/');
                }
            });
        };

        $scope.user = {};
        $scope.tasks = [];
        $scope.pageInfo = {
            count: 0,
            pageNo: 1,
        };

        $scope.token = window.localStorage.getItem('token');

        getTasks();

        // goto create task page
        $scope.create = function() {
            $location.path('/createTask');
        };

        // goto update task page
        $scope.update = function(task) {
            $location.path('/updateTask').search({
                _id: task._id
            });
        };

        // delete task
        $scope.delete = function(task) {

            task.$delete({id: task._id}).then(function(response) {
                console.log(response);
            }).catch(function(response) {
                console.log(response);
            });

            getTasks();
        };

        // page navigation
        $scope.prev = function() {
            console.log('prev');
            if ($scope.pageInfo.pageNo == 0) {
                return;
            }
            $scope.pageInfo.pageNo--;
            getTasks();
        };

        $scope.next = function() {
            console.log('next');
            if ($scope.pageInfo.pageNo >= $scope.pageInfo.totalPages - 1) {
                return;
            }
            $scope.pageInfo.pageNo++;
            getTasks();
        };

        $scope.goto = function(n) {
            console.log('goto', n);
            $scope.pageInfo.pageNo = n;
            getTasks();
        };
    });
}());
