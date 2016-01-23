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
                }
            }).catch(function(response) {
                $scope.error = 'Server Error!';
            });
        };
    });
}());
