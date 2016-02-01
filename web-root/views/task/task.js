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
    var _id;
	//获取数据到分页
	//var token = window.localStorage.getItem('token');
  /*  $scope.rsData = [
        {_id:'56a72e3b7c7c22b40de11742',name:'asdasda',create:'2016-01-26T08:28:43.599Z',deadline:'2016-01-26T08:28:43.599Z'},
        {_id:'56a739c87c7c22b40de11744',name:'asdsa',create:'2016-01-26T09:18:00.930Z',deadline:'2016-01-26T09:18:00.930Z'},
        {_id:'56a739cd7c7c22b40de11746',name:'lidasi',create:'2016-01-26T09:18:05.384Z',deadline:'2016-01-26T09:18:05.384Z'},
        {_id:'four',name:'xpx',create:'bmldl',deadline:'owowxmma'},
        {_id:'five',name:'bmeme',create:'o',deadline:'owowxmma'}
    ];*/
	var user ={};
	var obj;
    var objs =[];
    var token = window.localStorage.getItem('token');
    $http.get(config.apiUrl + 'user', {
        headers: {
            Authorization: 'Bearer ' + token
        }}).then(function(response){
            
            $http.post(config.apiUrl + 'task/show', response.data).then(function(res){
                obj = res.data;
                
                for(var i=0; i<obj.length; i++){
                    objs.push(obj[i].targetRef);
                }
               // $scope.rsData = [{_id:obj._id, name:obj.name, create:obj.create, deadline:obj.deadline}];
            });
            $scope.rsData = objs;
           
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

		/* app.directive('paging', function() {
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
            //$scope.call.splice(index,1);
            
			//console.log($sope.list);
		    
            $http.post(config.apiUrl + 'task/delTask', $scope.rsData[index]._id).success(function(response) {
                if (response.data == 'task') {
                    $location.path('/task');
                    $location.replace();
                } else {
                    console.log('del error');
                }
            }).error(function(data,status,headers,config){
				console.log('no data');
			})
        };
	
		
		
		$scope.createTask = function(){
			$location.path('/createTask');
            $location.replace();
		}
       
	    $scope.updateTask = function(index){
            var _id = $scope.rsData[index]._id;
            // var name = $scope.rsData[index].name;
            // var create = $scope.rsData[index].create;
            // var deadline = $scope.rsData[index].deadline
			$location.path('/updateTask').search({_id:_id});
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