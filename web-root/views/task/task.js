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
    app.controller('taskController', ['$scope', '$location', '$http', 'config', '$rootScope', function($scope, $location, $http, config, $rootScope) {
		$rootScope.location = $location;
		
		//获取数据到分页

	 $http.get(config.apiUrl+'user').success(function(data){
			$scope.list = data;		
			
			});

	//deleted
		$scope.delTask = function(index) {
            $scope.call.splice(index,1);
			console.log($sope.list);
		
            $http.post(config.apiUrl + 'user/delTask', {index:index}).success(function(data) {
                $scope.list = data;
                
            }).error(function(data,status,headers,config){
				alert('no data')
			})
        };
	
		
		
		$scope.createTask = function(){

			$location.path('/createTask',$rootScope.location);
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