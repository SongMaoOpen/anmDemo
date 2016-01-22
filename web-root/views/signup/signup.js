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
    app.controller('SignUpController', ['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {

        $scope.error = '';

        $scope.gotoMenu = function() {
            $location.path('/');
            //$location.replace();
        };

        $scope.signup = function(user, thisForm) {
            thisForm.username.$setDirty();
            thisForm.password.$setDirty();
            thisForm.email.$setDirty();
            if (thisForm.$invalid) {
                return;
            }

            $http.post(config.apiUrl + 'user/signup', user).then(function(response) {
                var data = response.data;
                if (data.errorInfo != null) {
                    // Server API Error.
                    $scope.error = data.errorInfo.description;
                }
            }).catch(function(response) {
                //console.log(response);
                $scope.error = 'Server Error!';
            });
        };
    }]);
}());
