(function() {
    'use strict';
    var app = angular.module('anmApp.main', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main/main.html',
            controller: 'MainController'
        });
    }]);
    app.controller('MainController', ['$scope', '$location', function($scope, $location) {
        $scope.gotoSignIn = function() {
            // TBD
            console.log('goto Sign In');
        };

        $scope.gotoSignUp = function() {
            $location.path('/signup');
            $location.replace();
        };
    }]);
}());
