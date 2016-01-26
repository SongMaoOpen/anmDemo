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
    app.controller('updateTaskController', ['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
        $scope.error;

		$http.get(config.apiUrl+'user').success(function(data){
			
		});
		 $scope.gotoMenu = function() {
            $location.path('/task');
            $location.replace();
        };
       
    }]);
}())