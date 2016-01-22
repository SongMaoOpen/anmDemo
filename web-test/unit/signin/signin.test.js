describe('SignInController', function() {
    beforeEach(module('anmApp'));

    var $controller;
    var $scope;
    var $location;
    var $http;
    var $httpBackend;

    var user = {
        username: '1',
        password: '1'
    };

    var thisForm = {
        username: {
            $setDirty: function() {}
        },
        password: {
            $setDirty: function() {}
        }
    };

    var signinController;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$http_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();

        $location = _$location_;
        spyOn($location, 'path');

        $http = _$http_;
        $httpBackend = _$httpBackend_;

        // create controller
        signinController = $controller('SignInController', {
            $scope: $scope,
            $location: $location,
            $http: $http,
            config: {
                apiUrl: ''
            }
        });

        spyOn(thisForm.username, '$setDirty');
        spyOn(thisForm.password, '$setDirty');
    }));

    describe('$scope.gotoMenu', function() {
        it('test location to root', function() {
            //var $scope;
            $scope.gotoMenu();
            expect($location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('$scope.signin', function() {
        it('test signin new use success', () => {
            $scope.error = '';
            $httpBackend.expectPOST('authorize', user).respond(200, {
                token: 'abcdef'
            });
            $scope.signin(user, thisForm);
            expect($scope.error).toBe('');
            expect(window.localStorage.token).toBe('abcdef');
            $httpBackend.flush();
        });
    });

    describe('$scope.signin', function() {
        it('test signin new use fail', () => {
            var errorMsg = 'unit test error!';
            $httpBackend.whenPOST('authorize', user).respond({
                errorInfo: {
                    description: errorMsg
                }
            });
            $scope.signin(user, thisForm);
            $httpBackend.flush();
            expect($scope.error).toBe(errorMsg);
        });
    });

    describe('$scope.signin', function() {
        it('test signin new user: server error', function() {
            $httpBackend.whenPOST('authorize', user).respond(404);
            $scope.signin(user, thisForm);
            $httpBackend.flush();
            expect($scope.error).toBe('Server Error!');
        });
    });

});
