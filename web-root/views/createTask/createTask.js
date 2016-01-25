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
 /*      //$http��get������Զ�̵�һ���ļ�������������ɹ�����ִ��һ���ص������������Ĳ������Ǵ�Զ���ļ����õ������ݣ�������ݿ����Ǹ����飬Ҳ�����Ǹ�����
        //��ô��������õ�����һ��json���飬�����Ԫ����һ�����Ķ���
        $http.get('task/long').success(function (data) {
            //���������һ��Ԫ��ȡ����������ģ�������������������ϡ�����json�����id�Ǵ�1��ʼд�ģ������ص������Ǹ����飬�±��0��ʼ������Ҫ��ȥ1
            $scope.student = data[$routeParams.id - 1];
            //����˳�����������Ԫ�ظ���ȡ������ÿ��Ԫ�ؾʹ�����ҳ����ôԪ���ܸ����ʹ����ж���ҳ��
            //ע��Ҫ���ݸ���߼���ĸ��������Ϊ�����ܸ�д�����ͬ�����ԣ��������û��ֱ�Ӹ�ֵ����ô�����ͬ�����Խ��̳и���ͬ�����Ե�ֵ��
			//�����ڻص����ļ���������ġ��� {{allPage}} ҳ������������Ǹ���$rootScope�����ԡ������ڸ��������в�û���ر�ĸ�ֵ�������spanԪ��ǡ�þ��ڸ����������������ڣ���ô���Ԫ�����allPage���Ծͻ�̳и��������ͬ������allPage��ֵ��Ҳ�ͼ�ӵ���ʾ������ҳ����

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
