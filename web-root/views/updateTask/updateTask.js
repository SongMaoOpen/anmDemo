(function(){
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
    app.controller('updateTaskController', ['$rootScope','$scope', '$location', '$http', 'config', function($rootScope,$scope, $location, $http, config) {
        $scope.error;
	
		var taskId = $location. absUrl();
		for(var key in taskId){
			alert(taskId[key]);
		}
		alert(taskId);
		$http.get(config.apiUrl+'updateTask').success(function(data){
            $http.get(config.apiUrl + 'user', data.task_id).success(function(data) {
                
				$scope.list = data;
                
            }).error(function(data,status,headers,config){
				alert('no data')
			})
       
		});
		 $scope.gotoMenu = function() {
            $location.path('/task');
            $location.replace();
        };
       
    }]);
}())