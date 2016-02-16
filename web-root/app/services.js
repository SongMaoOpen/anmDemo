(function() {
    var app = angular.module('anmApp.services', ['ngResource']);

    var authorizationHeaders = function() {
        return {
            Authorization: 'Bearer ' + window.localStorage.getItem('token')
        };
    };

    app.service('userService', function($http, config) {
        this.getMe = function() {
            return $http.get(config.apiUrl + 'user', {
                headers: authorizationHeaders()
            });
        };
    });

    app.service('taskService', function($resource, config) {
        this.getFactory =  function() {
            return $resource(config.apiUrl + 'task/:id', {}, {
                'get': {
                    method: 'GET',
                    headers: authorizationHeaders()
                },
                'create': {
                    method: 'POST',
                    headers: authorizationHeaders()
                },
                'save': {
                    method: 'PUT',
                    headers: authorizationHeaders()
                },
                'query': {
                    method: 'GET',
                    isArray: true,
                    headers: authorizationHeaders()
                },
                'delete': {
                    method: 'DELETE',
                    headers: authorizationHeaders()
                }
            });
        };
    });
}());
