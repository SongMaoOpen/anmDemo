(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.updateTask',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/updateTask', {
            templateUrl: 'views/updateTask/updateTask.html',
            controller: 'updateTaskController'
        });
    }]);

    // define controller
    app.controller('updateTaskController', function($rootScope, $scope, $location, $http, config, taskService) {
        $scope.error;
        // get task's resource
        var Task = taskService.getFactory();
        var taskId = $location.search()._id;

        Task.get({
            id: taskId
        }, function(task) {
            $scope.task = task;
        }, function() {
        });

        $scope.update = function(task) {
            task.$save({
                id: task._id
            }).then(function(response) {
                $scope.gotoMenu();
            }).catch(function(response) {
            });
        };

        $scope.gotoMenu = function() {
            $location.path('/task');
        };
    });
}());
