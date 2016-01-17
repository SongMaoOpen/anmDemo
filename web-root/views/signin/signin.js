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
    app.controller('SignInController', ['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
        $scope.error;

        $scope.gotoMenu = function() {
            $location.path('/');
            $location.replace();
        };

        $scope.signin = function(user, thisForm) {
            $http.put(config.apiUrl + 'user/login', user).then(function(response) {
                var msg = response.data;
                if (msg.errorInfo != null) {
                    $scope.error = msg.errorInfo.description;
                }
            }, function(response) {
                $scope.error = 'Server Error!';
            });
        };
    }]);
}());
