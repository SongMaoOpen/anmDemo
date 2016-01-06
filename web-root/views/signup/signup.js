(function() {
    'use strict';
    var app = angular.module('anmApp.signup', ['ngRoute']);

    // set router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'SignUpController'
        });
    }]);

    // define controller
    app.controller('SignUpController', ['$scope', '$location', function($scope, $location) {
        $scope.foobar = 'hello signup';
        $scope.gotoMenu = function() {
            $location.path('/');
            $location.replace();
        };
    }]);
}());
