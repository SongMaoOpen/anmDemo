(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.turnPage',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/turnPage', {
            templateUrl: 'views/location/turnPage.html',
            controller: 'turnPageController'
        });
    }]);

    // define controller
    app.controller('turnPageController', ['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
        $scope.error;

      
    }]);
}());
