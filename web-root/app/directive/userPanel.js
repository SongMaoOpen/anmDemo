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
            controller: function($scope, userService) {
            }
        };
    });

})();
