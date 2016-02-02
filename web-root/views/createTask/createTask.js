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
    app.controller('createTaskController', ['$scope', '$location', '$http', 'config', '$rootScope', function($scope, $location, $http, config, $rootScope) {
		var token = window.localStorage.getItem('token');

		var task = {};
		$scope.error = '';
			
			

        $scope.gotoMenu = function() {
            $location.path('/task');
            //$location.replace();
        };

        $scope.createTask = function(task) {
			
           
		   task.name = task.name;
		   task.token = token;
		  
			
            $http.post(config.apiUrl + 'task/createTask', task, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {    
				if (response.data != null) {
                    console.log('create success');
                    $location.path('/task');
                    $location.replace();
                } else {
                    console.log('create error');
                }
                if (data.errorInfo != null) {
                    // Server API Error.
                    $scope.error = data.errorInfo.description;
                }
            }, function(response) {
				
                //console.log(response);
                $scope.error = 'Server Error!';
            });
		
        };
    }]);
}());
