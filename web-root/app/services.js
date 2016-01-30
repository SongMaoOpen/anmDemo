(function() {
    var userServices = angular.module('userServices');

    UserServices.factory('User', ['$http', 'config', function($http, config) {
        return {
            getMe: function() {
                return $http(config.apiUrl + 'user', {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                });
            }
        };
    }]);
});
