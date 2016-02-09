(function() {
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
    app.controller('taskController', function($scope, $location, $http, config, $rootScope, userService) {

        userService.getMe().then(function(response) {
            $scope.user = response.data;
        }).catch(function(response) {
            console.log(response.data);
        });

        $http.get(config.apiUrl + 'task', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(function(response) {
            $scope.tasks = response.data;
        }).catch(function(response) {
            console.log(response.data);
        });

        /*
        var obj;
        var currentPage = 1;
        var max;
        $scope.myVar = true;
        $scope.myPar = true;
        var token = window.localStorage.getItem('token');
        $http.get(config.apiUrl + 'user', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            $scope.currentPage = 1;
            $scope.numPages = 5;
            $scope.pageSize = 5;
            $scope.pages = [];

            var taskId = response.data;
            taskId.num = currentPage;

            $http.post(config.apiUrl + 'task/show', taskId).then(function(res) {
                // $scope.rsData = res.data[0];
                //控制上一页和下一页标签，当上一页标签等于1时隐藏上一页控件，
                //当下一页标签到最大一页时隐藏下一页控件
                if (currentPage == max) {
                    $scope.myVar = false;
                } else {
                    $scope.myVar = true;
                }

                if (currentPage == 1) {
                    $scope.myPar = false;
                } else {
                    $scope.myPar = true;
                }

                $scope.pages = [];
                var index = [];
                var sumArr = 1;
                var sum = 0;
                for (var key in res.data[0]) {
                    var obj = res.data[0][key];
                    for (var key1 in obj) {
                        if (obj.count != sum) {
                            obj.count = sumArr * currentPage;
                            index.push(obj);
                            sum += 1;
                        } else {
                            continue;
                        }
                    }
                    sumArr += 1;
                }
                $scope.rsData = index;
                sum = res.data[1];

                var count = parseInt(sum / $scope.numPages);
                if (count < sum / $scope.numPages) {
                    count += 1;
                    max = count;
                    for (var i = 1; i <= count; i++) {
                        $scope.pages.push(i);
                    }
                } else {
                    max = count;
                    for (var i = 1; i <= count; i++) {
                        $scope.pages.push(i);
                    }
                }
                // var correntPage = 1;
                // $scope.rsData = [{_id:obj._id, name:obj.name, create:obj.create, deadline:obj.deadline}];
            });
        });

        //下一页
        $scope.selectNext = function() {
            $scope.pages = [];
            if (currentPage >= max) {
                $scope.myVar = false;
            } else {
                currentPage += 1;

                //控制上一页和下一页标签，当上一页标签等于1时隐藏上一页控件，
                //当下一页标签到最大一页时隐藏下一页控件
                if (currentPage == max) {
                    $scope.myVar = false;
                } else {
                    $scope.myVar = true;
                }
                if (currentPage == 1) {
                    $scope.myPar = false;
                } else {
                    $scope.myPar = true;
                }
                $http.get(config.apiUrl + 'user', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(function(response) {

                    $scope.currentPage = 1;
                    $scope.numPages = 5;
                    $scope.pageSize = 5;
                    $scope.pages = [];

                    var taskId = response.data;
                    taskId.num = currentPage;

                    $http.post(config.apiUrl + 'task/show', taskId).then(function(res) {
                        // $scope.rsData = res.data[0];
                        if (res.data != null) {
                            var index = [];
                            var sumArr = currentPage * 5 - 4;
                            var sum = currentPage * 5 - 5;
                            for (var key in res.data[0]) {

                                var obj = res.data[0][key];
                                for (var key1 in obj) {
                                    if (obj.count != sum) {
                                        obj.count = sumArr;
                                        index.push(obj);
                                        sum += 1;
                                    } else {
                                        continue;
                                    }
                                }
                                sumArr += 1;
                            }
                            $scope.rsData = index;
                            var sum = res.data[1];
                            var count = parseInt(sum / $scope.numPages);
                            if (count < sum / $scope.numPages) {
                                count += 1;
                                for (var i = 1; i <= count; i++) {
                                    $scope.pages.push(i);
                                }
                            } else {
                                max = count;
                                for (var i = 1; i <= count; i++) {
                                    $scope.pages.push(i);
                                }
                            }
                        } else {
                            alert('null');
                        }
                        // $scope.rsData = [{_id:obj._id, name:obj.name, create:obj.create, deadline:obj.deadline}];
                    });
                });
            }
        };

        //上一页
        $scope.selectPrevious = function(){
            $scope.pages = [];
            //控制上一页和下一页标签，当上一页标签等于1时隐藏上一页控件，
            //当下一页标签到最大一页时隐藏下一页控件
            if (currentPage > 1) {
                currentPage -= 1;
                if (currentPage == 1) {
                    $scope.myPar = false;
                } else {
                    $scope.myPar = true;
                }
                if (currentPage == max) {
                    $scope.myVar = false;
                } else {
                    $scope.myVar = true;
                }
                $http.get(config.apiUrl + 'user', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(function(response) {

                    $scope.currentPage = 1;
                    $scope.numPages = 5;
                    $scope.pageSize = 5;
                    $scope.pages = [];

                    var taskId = response.data;
                    taskId.num = currentPage;

                    $http.post(config.apiUrl + 'task/show', taskId).then(function(res) {
                        // $scope.rsData = res.data[0];
                        if (res.data != null) {
                            var index = [];
                            var sumArr = currentPage * 5 - 4;
                            var sum = currentPage * 5 - 5;
                            for (var key in res.data[0]) {
                                var obj = res.data[0][key];
                                for (var key1 in obj) {
                                    if (obj.count != sum) {
                                        obj.count = sumArr;
                                        index.push(obj);
                                        sum += 1;
                                    } else {
                                        continue;
                                    }
                                }
                                sumArr += 1;
                            }
                            $scope.rsData = index;
                            var sum = res.data[1];
                            var count = parseInt(sum / $scope.numPages);
                            if (count < sum / $scope.numPages) {
                                count += 1;
                                for (var i = 1; i <= count; i++) {
                                    $scope.pages.push(i);
                                }
                            } else {
                                max = count;
                                for (var i = 1; i <= count; i++) {
                                    $scope.pages.push(i);
                                }
                            }
                            //var correntPage = 1;
                        } else {
                            console.log('null');
                        }
                    });
                });
            } else {
                alert('页码不足');
            }
        };

        //页码控制
        $scope.selectPage = function(page) {

            currentPage = page;
            $http.get(config.apiUrl + 'user', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                $scope.currentPage = 1;
                $scope.numPages = 5;
                $scope.pageSize = 5;
                $scope.pages = [];
                var taskId = response.data;
                taskId.num = currentPage;

                $http.post(config.apiUrl + 'task/show', taskId).then(function(res) {
                    // $scope.rsData = res.data[0];
                    //控制上一页和下一页标签，当上一页标签等于1时隐藏上一页控件，
                    //当下一页标签到最大一页时隐藏下一页控件
                    if (currentPage == max) {
                        $scope.myVar = false;
                    } else {
                        $scope.myVar = true;
                    }
                    if (currentPage == 1) {
                        $scope.myPar = false;
                    } else {
                        $scope.myPar = true;
                    }
                    if (res.data != null) {
                        var index = [];
                        var sumArr = currentPage * 5 - 4;

                        var sum = currentPage * 5 - 5;
                        for (var key in res.data[0]) {

                            var obj = res.data[0][key];
                            for (var key1 in obj) {
                                if (obj.count != sum) {
                                    obj.count = sumArr;
                                    index.push(obj);
                                    sum += 1;
                                } else {
                                    continue;
                                }
                            }
                            sumArr += 1;
                        }
                        $scope.rsData = index;
                        var sum = res.data[1];

                        var count = parseInt(sum / $scope.numPages);
                        if (count < sum / $scope.numPages) {
                            count += 1;
                            for (var i = 1; i <= count; i++) {
                                $scope.pages.push(i);
                            }
                        } else {
                            max = count;
                            for (var i = 1; i <= count; i++) {
                                $scope.pages.push(i);
                            }
                        }
                        //var correntPage = 1;
                    } else {
                        alert('null');
                    }
                    // $scope.rsData = [{_id:obj._id, name:obj.name, create:obj.create, deadline:obj.deadline}];
                });
            });
        };

        //deleted
        $scope.delTask = function(id) {
            var taskId = {
                _id: id
            };

            $http.post(config.apiUrl + 'task/remove', taskId).then(function(response) {
                //if (response.data == 'undefined') {
                //  $location.path('/task');
                //$location.replace();
                //}
                //$scope.rsData.splice($scope.rsData.indexOf(id), 1);
                alert('删除成功');
                $http.get(config.apiUrl + 'user', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(function(response) {
                    $scope.currentPage = 1;
                    $scope.numPages = 5;
                    $scope.pageSize = 5;
                    $scope.pages = [];

                    var taskId = response.data;
                    taskId.num = currentPage;

                    $http.post(config.apiUrl + 'task/show', taskId).then(function(res) {
                        // $scope.rsData = res.data[0]; 
                        var index = [];
                        var sumArr = 1;
                        var sum = 0;
                        for (var key in res.data[0]) {
                            var obj = res.data[0][key];
                            for (var key1 in obj) {
                                if (obj.count != sum) {
                                    obj.count = sumArr * currentPage;
                                    index.push(obj);
                                    sum += 1;
                                } else {
                                    continue;
                                }
                            }
                            sumArr += 1;
                        }
                        $scope.rsData = index;
                        sum = res.data[1];

                        var count = parseInt(sum / $scope.numPages);
                        if (count < sum / $scope.numPages) {
                            count += 1;
                            max = count;
                            for (var i = 1; i <= count; i++) {
                                $scope.pages.push(i);
                            }
                        } else {
                            max = count;
                            for (var i = 1; i <= count; i++) {
                                $scope.pages.push(i);
                            }
                        }
                        var correntPage = 1;
                        // $scope.rsData = [{_id:obj._id, name:obj.name, create:obj.create, deadline:obj.deadline}];
                    });
                });
            }).error(function(data, status, headers, config) {
                console.log('no data');
            });
        };

        $scope.createTask = function() {
            $location.path('/createTask');
            $location.replace();
        };

        $scope.updateTask = function(id) {
            var _id = id;
            // var name = $scope.rsData[index].name;
            // var create = $scope.rsData[index].create;
            // var deadline = $scope.rsData[index].deadline
            $location.path('/updateTask').search({
                _id: _id
            });
            $location.replace();
        };

        $scope.signOut = function() {
            $location.path('/');
            $location.replace();
        };

        $scope.pages = 10;
        $scope.current = 5;
        */
    });
}());
