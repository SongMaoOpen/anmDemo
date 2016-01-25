(function() {
    'use strict';

    // get ng-app
    var app = angular.module('anmApp.createTask',['ngRoute']);

    // define router
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createTask', {
            templateUrl: 'views/createTask/createTask.html',
            controller: 'createTaskController'
        });	
    }]);
			
    // define controller
    app.controller('createTaskController', ['$scope', '$location', '$http', 'config', '$rootScope', function($scope, $location, $http, config, $rootScope) {
 /*      //$http的get方法与远程的一个文件发出请求，如果成功，则执行一个回调函数，函数的参数就是从远端文件里拿到的数据，这个数据可以是个数组，也可以是个对象。
        //那么我们这次拿到的是一个json数组，数组的元素是一个个的对象。
        $http.get('task/long').success(function (data) {
            //把数组里的一个元素取出来，赋给模板子作用域对象的属性上。由于json数组的id是从1开始写的，而返回的数据是个数组，下标从0开始，所以要减去1
            $scope.student = data[$routeParams.id - 1];
            //这里顺便把这个数组的元素个数取出来，每个元素就代表以页。那么元素总个数就代表共有多少页。
            //注意要传递给最高级别的根域对象，因为子域能覆写父域的同名属性；子域如果没有直接赋值，那么子域的同名属性将继承父域同名属性的值；
			//我们在回到本文件代码上面的“共 {{allPage}} 页”处，这个就是根域$rootScope的属性。而且在父控制器中并没有特别的赋值。而这个span元素恰好就在父控制器的作用域内，那么这个元素里的allPage属性就会继承父作用域的同名属性allPage的值，也就间接的显示出了总页数。

            $rootScope.allPage = data.length;
        });
*/

	
	
		$scope.error = '';

        $scope.gotoMenu = function() {
            $location.path('/task');
            //$location.replace();
        };

        $scope.createTask = function(task, thisForm) {
			var url=document.location.href;
			var a = url.lastIndexOf("=");
			var token = url.substring(a+1,url.length);
	
            thisForm.name.$setDirty();
            if (thisForm.$invalid) {
                return;
            }
			
			
            $http.post(config.apiUrl + 'task/createTask', task, token).then(function(response) {
                var data = response.data;
				
                if (data.errorInfo != null) {
                    // Server API Error.
                    $scope.error = data.errorInfo.description;
                }
            }, function(response) {
                //console.log(response);
                $scope.error = 'Server Error!';
            });
        };
    }]);
}());
