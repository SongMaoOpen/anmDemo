(function() {
    'use strict';
    var app = angular.module('anmApp', [
            // Angular Module
            'ngRoute',

            // Controllers
            'anmApp.main',
            'anmApp.signup',
            'anmApp.signin',
            'anmApp.task',
            'anmApp.updateTask',
            'anmApp.createTask',
            'anmApp.turnPage',

            // Services
            'anmApp.services',
            // Directive
            'anmApp.directive'

    ]);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    // define constant
    app.constant('config', {
        apiUrl: 'http://localhost:30001/services/',
        perPageCount: 5
    });

    // define filter
    app.filter('range', function() {
        return function(input, end, begin) {
            input = [];
            begin = begin || 0;
            for (var i = begin; i < end; i++) {
                input.push(i);
            }

            return input;
        };
    });

}());
