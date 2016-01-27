(function(){
'use strict';

    // get ng-app
    var app = angular.module('anmApp.task',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/task', {
            templateUrl: 'views/task/task.html',
            controller: 'taskController'
        });
    }]);
 // define controller
    app.controller('taskController', ['$scope', '$location', '$http', 'config', '$rootScope', function($scope, $location, $http, config, $rootScope) {
		
		
		//获取数据到分页
	var token = window.localStorage.getItem('token');
	var task ={};
	$scope._id;
	$scope.name = '';
	$scope.create = '';
	$scope.deadline='';
	/*$scope.page = [
		{id:'01', username:'ldld', password:'mgelg'},
		{id:'02', username:'2dld', password:'mgelg'},
		{id:'03', username:'3dld', password:'mgelg'},
		{id:'04', username:'4dld', password:'mgelg'},
	
	];*/
	task.token = token;
	 $http.get(config.apiUrl+'user/show', task, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).success(function(data){
      			$scope.page=data;
				
	 });

       /* $scope.currentPage = 1;
        $scope.numPages = 5;
        $scope.pageSize = 10;
        $scope.pages = [];
       //获得第一页
        $http.get(config.'Customers_JSON.txt',
            {
               method: 'GET',
               params: {
               'pageNo': $scope.currentPage,
               'pageSize': $scope.pageSize
						},
               responseType: "json"
             }).then(function (result) {
                    $scope.data = result.data.Data;
                    $scope.numPages = Math.ceil(result.data.Total / result.data.PageSize);
                });
        /*.success(function(response){
				$scope.names = response.records;
				$scope.numPages = Math.ceil($scope.names.length / $scope.pageSize);
				
				
			});*/
     /*   
        $scope.onSelectPage = function (page) {
          
            $http.get('Customers_JSON.txt',
                {
                    method: 'GET',
                    params: {
                        'pageNo': page,
                        'pageSize': $scope.pageSize
                    },
                    responseType: "json"
                }) .then(function (result) {
                    $scope.data = result.data.Data;
                    $scope.numPages = Math.ceil(result.data.Total / result.data.PageSize);
                });
            /*.success(function(response){
				$scope.names = response.records;
				$scope.numPages = Math.ceil($scope.names.length / $scope.pageSize);
				});*/
		 //};

		/* myModule.directive('paging', function() {
			return {
            restrict: 'E',
            //scope: {
            //    numPages: '=',
            //    currentPage: '=',
            //    onSelectPage: '&'
            //},
            template: '',
            replace: true,
            link: function(scope, element, attrs) {
                scope.$watch('numPages', function(value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }
                    
                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });
                scope.isActive = function(page) {
                    return scope.currentPage === page;
                };
                scope.selectPage = function(page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage(page);
                    }
                };
                scope.selectPrevious = function() {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };
                scope.selectNext = function() {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };
                scope.noPrevious = function() {
                    return scope.currentPage == 1;
                };
                scope.noNext = function() {
                    return scope.currentPage == scope.numPages;
                };

            }
        };
    });*/


	//deleted
		$scope.delTask = function(index) {
            $scope.call.splice(index,1);
			console.log($sope.list);
		
            $http.post(config.apiUrl + 'user/delTask', {index:index}).success(function(data) {
                $scope.list = data;
                
            }).error(function(data,status,headers,config){
				alert('no data')
			})
        };
	
		
		
		$scope.createTask = function(){

			$location.path('/createTask');
			 $location.replace();
		}
       
	    $scope.updateTask = function(index){
			
			$location.path('/updateTask').search({index:index});
			 $location.replace();
		}

		$scope.signOut = function(){
			$location.path('/');
			$location.replace();
		}

	/*
	
	*/
	
	$scope.pages = 10;
    $scope.current = 5;
    }]);
	 // get ng-app
	
   
}())