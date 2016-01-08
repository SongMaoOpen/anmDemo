(function() {
    'use strict';
    angular.module('anmApp', [
            'ngRoute',
            'anmApp.main',
            'anmApp.signup'
    ]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
}());
