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
	    var taskId = {_id:$location.search()._id};
		
        $http.post(config.apiUrl + 'task/request', taskId).then(function(response){
            $scope.name = response.data.name;
            $scope.create = response.data.create;
            $scope.deadline = response.data.deadline;
        });
        // $scope.name = $location.search().name;
        // $scope.create = $location.search().create;
        // $scope.deadline = $location.search().deadline;
        
        /*$http.get(config.apiUrl + 'task', taskId).then(function(response){
            $scope.name = response.data.name;
            $scope.create = response.data.create;
            $scope.deadline = response.data.deadline
        })*/
     

        $scope.update = function(){
		    var task = {
                _id:$location.search()._id,
                name:$scope.name,
                create:$scope.create,
                deadline:$scope.deadline,
            };
            $http.post(config.apiUrl + 'task/updateTask', task).then(function(response) {
                if (response.data == 'task') {
                    console.log('update success');
                    $location.path('/task');
                    $location.replace();
                } else {
                    console.log('update error');
                }           
            });
       
        }
		 $scope.gotoMenu = function() {
            $location.path('/task');
            $location.replace();
        };
       
        
    }]);
}())