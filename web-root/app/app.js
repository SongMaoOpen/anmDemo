(function() {
    'use strict';
    angular.module('anmApp', ['ngRoute', 'anmApp.main']).config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
}());
