(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.createTask',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createTask', {
            templateUrl: 'views/createTask/createTask.html',
            controller: 'createTaskController'
        });
    }]);

    // define controller
    app.controller('createTaskController', function($scope, $location, $http, config, $rootScope, taskService) {

        var token = window.localStorage.getItem('token');

        var task = {};
        $scope.error = '';

        // get task's resource
        var Task = taskService.getFactory();

        $scope.gotoMenu = function() {
            $location.path('/task');
        };

        $scope.createTask = function(task) {
            task.name = task.name;
            task.token = token;

            var newTask = new Task({
                name: task.name
            });

            newTask.$create().then(function(response) {
                $location.path('/task');
            }).catch(function(response) {
                console.log(response.data);
            });
        };
    });
}());
