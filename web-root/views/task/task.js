(function(){
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
    app.controller('taskController', ['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
     $http.get("Customers_JSON.txt").success(function(response){
				$scope.names = response.records;		
				
			});

		
	


		$scope.createTask = function(){
			$location.path('/createTask');
			 $location.replace();
		}
       
	   $scope.updateTask = function(){
			$location.path('/updateTask');
			 $location.replace();
		}

		$scope.signOut = function(){
			$location.path('/');
			$location.replace();
		}

	/*
	
	*/
	
	$scope.pages = 10;
    $scope.current = 5;
    }]);
	 // get ng-app
	
   
}())