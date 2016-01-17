describe('SignUpController', function() {
    beforeEach(module('anmApp'));

    var $controller;
    var $scope;
    var location;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        location = _$location_;
        spyOn(location, 'path');
        //location = jasmine.createSpyObj('location', ['url']);
    }));

    describe('$scope.gotoMenu', function() {
        it('test location to root', function() {
            //var $scope;
            var controller = $controller('SignUpController', {
                $scope: $scope,
                $location: location,
                $http: null,
                config: null
            });
            $scope.gotoMenu();
            expect(location.path).toHaveBeenCalledWith('/');
        });
    });
});
