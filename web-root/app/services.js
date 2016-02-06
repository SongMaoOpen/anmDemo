(function() {
    var app = angular.module('anmApp.services', [])

    app.service('UserService', function($http, config) {
        this.getMe = function() {
            return $http(config.apiUrl + 'user', {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            });
        };
    });
}());
