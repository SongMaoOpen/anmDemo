(function() {
    'use strict';
    var app = angular.module('anmApp', [
            'ngRoute',
            'anmApp.main',
            'anmApp.signup',
            'anmApp.signin',
            'anmApp.task',
            'anmApp.updateTask',
            'anmApp.createTask',
            'anmApp.turnPage'
    ]);

    // set router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

    // set constant
    app.constant('config', {
        apiUrl: 'http://localhost:30001/services/'
    });
}());
