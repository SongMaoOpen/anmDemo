(function() {
    var app = angular.module('anmApp.services', []);

    app.service('userService', function($http, config) {
        this.getMe = function() {
            return $http.get(config.apiUrl + 'user', {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            });
        };
    });
}());
