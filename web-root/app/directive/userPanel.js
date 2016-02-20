(function() {
    var app = angular.module('anmApp.directive', [
        // Services
        'anmApp.services'
    ]);

    app.directive('userPanel', function(userService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directive/userPanel.html',
            scope: {
                key: '=token'
            },
            controller: function($scope, $location, userService) {
                userService.getMe($scope.key).then(function(response) {
                    $scope.user = response.data;
                }).catch(function(response) {
                    if (response.status === 401) {
                        $location.path('/');
                    }
                });

                // sign out
                $scope.signout = function() {
                    userService.signOut($scope.key).then(function() {
                        $location.path('/');
                    }).catch(function(response) {
                        //$location.path('/');
                    });
                };
            }
        };
    });

})();
