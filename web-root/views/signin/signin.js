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
    app.controller('SignInController', ['$scope', '$location', function($scope, $location) {
        $scope.error;

        $scope.gotoMenu = function() {
            $location.path('/');
            $location.replace();
        };

        $scope.signin = function(user, thisForm) {
            $.ajax('http://localhost:30001/services/user/login', {
                data: user,
                method: 'POST'
            }).done(function(msg) {
                if (msg.errorInfo != null) {
                    $scope.$apply(function() {
                        $scope.error = msg.errorInfo.description;
                    });
                }
            }).fail(function() {
                $scope.$apply(function() {
                    $scope.error = 'Server Error!';
                });
            });
        };
    }]);
}());
