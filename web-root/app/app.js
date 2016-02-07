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
            'anmApp.services'
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
