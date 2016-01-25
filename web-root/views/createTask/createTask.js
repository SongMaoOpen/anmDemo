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
		$scope.error = '';

        $scope.gotoMenu = function() {
            $location.path('/task');
            //$location.replace();
        };

        $scope.createTask = function(task, thisForm) {
			var url=document.location.href;
			var a = url.lastIndexOf("=");
			var token = url.substring(a+1,url.length);
	
            thisForm.name.$setDirty();
            if (thisForm.$invalid) {
                return;
            }
			
			
            $http.post(config.apiUrl + 'task/createTask', task, token).then(function(response) {
                var data = response.data;
				
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
