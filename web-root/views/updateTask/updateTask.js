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
	
		var taskId = $location.search()._id;
        $scope.name = $location.search().name;
        $scope.create = $location.search().create;
        $scope.deadline = $location.search().deadline;

        $scope.update = function(){
		    var task = {
                _id:taskId;
                name:$scope.name;
                create:$scope.create;
                deadline:$scope.deadline;
            };
            $http.post(config.apiUrl + 'task/updateTask', task).success(function(response) {
                if (response.data == 'task') {
                    console.log('update success');
                    $location.path('/task');
                    $location.replace();
                } else {
                    console.log('update error');
                }
                
            }).error(function(data,status,headers,config){
				alert('no data')
			})
       
        }
		 $scope.gotoMenu = function() {
            $location.path('/task');
            $location.replace();
        };
       
    }]);
}())