describe('SignUpController', function() {
    beforeEach(module('anmApp'));

    var $controller;
    var $scope;
    var $location;
    var $http;
    var $httpBackend;

    var user = {
        username: '1',
        password: '1',
        email: '1@1.1'
    };

    var thisForm = {
        username: {
            $setDirty: function() {}
        },
        password: {
            $setDirty: function() {}
        },
        email: {
            $setDirty: function() {}
        }
    };

    var signupController;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$http_, _$httpBackend_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        spyOn($location, 'path');
        //location = jasmine.createSpyObj('location', ['url']);
        $http = _$http_;
        $httpBackend = _$httpBackend_;

        // create controller
        signupController = $controller('SignUpController', {
            $scope: $scope,
            $location: $location,
            $http: $http,
            config: {
                apiUrl: ''
            }
        });

        spyOn(thisForm.username, '$setDirty');
        spyOn(thisForm.password, '$setDirty');
        spyOn(thisForm.email, '$setDirty');

    }));

    describe('$scope.gotoMenu()', function() {
        it('[test location to root]', function() {
            //var $scope;
            $scope.gotoMenu();
            expect($location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('$scope.signup()', function() {
        it('[test signup new use success]', function() {
            $scope.error = '';
            $httpBackend.expectPOST('user/signup', user).respond(200, {
                token: '123456'
            });
            $scope.signup(user, thisForm);
            $httpBackend.flush();
            expect($scope.error).toBe('');
            expect(window.localStorage.token).toBe('123456');
        });
    });

    describe('$scope.signup()', function() {
        it('[test signup new user fail]', function() {
            var errorMsg = 'unit test error!';
            $httpBackend.whenPOST('user/signup', user).respond({
                errorInfo: {
                    description: errorMsg
                }
            });
            $scope.signup(user, thisForm);
            $httpBackend.flush();
            expect($scope.error).toBe(errorMsg);
        });
    });

    describe('$scope.signup()', function() {
        it('[test signup new user: server error]', function() {
            $httpBackend.whenPOST('user/signup', user).respond(404);
            $scope.signup(user, thisForm);
            $httpBackend.flush();
            expect($scope.error).toBe('Server Error!');
        });
    });
});
