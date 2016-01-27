(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.signin',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/signin', {
            templateUrl: 'views/signin/signin.html',
            controller: 'SignInController'
        });
    }]);

    // define controller
    app.controller('SignInController', function($scope, $location, $http, config) {
        $scope.error;

        $scope.gotoMenu = function() {
            $location.path('/');
        };

        $scope.signin = function(user, thisForm) {
            $http.post(config.apiUrl + 'authorize', user).then(function(response) {
                var msg = response.data;
                if (msg.errorInfo != null) {
                    $scope.error = msg.errorInfo.description;
                } else {
					window.localStorage.setItem('token', msg.token);
					$http.get(config.apiUrl + 'user', {
						headers: {
							Authorization: 'Bearer ' + msg.token
						}}).then(function(response){
							var user_id;
							for(var key in response.data){
								if(key == '_id'){
									user_id = response.data[key];
								}
							}
							$location.path('/task').search({userId:user_id});
							$location.replace();
							console.log(response);
					//		$scope.page = response.data;
					}).catch(function(response) {
					console.log(response);
					});
                   
                    
				}
            }).catch(function(response) {
                $scope.error = 'Server Error!';
            });
        };
    });
}());
