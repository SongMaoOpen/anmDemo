(function() {
    'use strict';
    var app = angular.module('anmApp.main', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main/main.html',
            controller: 'MainController'
        });
    }]);
    app.controller('MainController', [function() {
    }]);
}());
