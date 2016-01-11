(function() {
    'use strict';
    angular.module('anmApp', [
            'ngRoute',
            'anmApp.main',
            'anmApp.signup',
            'anmApp.signin'
    ]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
}());
