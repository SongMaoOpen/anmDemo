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
		var token;
		for(var key in $location.search()){
		token = $location.search()[key];
		}
		var obj = {};
		$scope.error = '';
			
			

        $scope.gotoMenu = function() {
            $location.path('/task');
            //$location.replace();
        };

        $scope.createTask = function(task) {
			
           
		   obj.name = task.name;
		   obj.token = token;
			//if(task.token!==null && task.token === this.token+''){
			
            $http.post(config.apiUrl + 'task/createTask', obj).then(function(response) {
                var data = response.data;
				
                if (data.errorInfo != null) {
                    // Server API Error.
                    $scope.error = data.errorInfo.description;
                }
            }, function(response) {
                //console.log(response);
                $scope.error = 'Server Error!';
            });
			//} else {
			///	alert('this.token:'+this.token);
			//}
        };
    }]);
}());
