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

        $scope.error = '';

        $scope.gotoMenu = function() {
            $location.path('/');
            $location.replace();
        };

        $scope.signup = function(user, thisForm) {
            thisForm.username.$setDirty();
            thisForm.password.$setDirty();
            thisForm.email.$setDirty();
            if (thisForm.$invalid) {
                return;
            }
            $.ajax('http://localhost:30001/services/user/signup', {
                data: user,
                method: 'PUT'
            }).done(function(msg) {
                console.log(msg);
                if (msg.errorInfo != null) {
                    // Server API Error.
                    $scope.$apply(function() {
                        $scope.error = msg.errorInfo.description;
                    });
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                $scope.$apply(function() {
                    $scope.error = 'Server Error!';
                });
            });
        };
    }]);
}());
