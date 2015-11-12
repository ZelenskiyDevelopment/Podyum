/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .controller('ListTaskCtrl', function ($scope, $rootScope, TaskManager, User, $filter, $q, $log, $mdDialog) {

        $scope.tasks = [];
        $scope.user = [];
        $scope.task = [];
        $scope.MyTasks = [];
        $rootScope.task = [];
        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;

        $scope.selectedItem = {
            display: '',
            value: '' ,
            id:''
        };

        User.get().$promise.then(function (me) {
            $scope.user = me;

            TaskManager.getAllTasksUser(me._id).then(function (tasks) {
                $scope.tasks = tasks.data;

            });

            TaskManager.getMyTask(me._id).then(function (tasks){

                $scope.MyTasks = tasks.data;

            });

            $scope.$watch("tasks", function (newValue, oldValue) {
                if (angular.isObject(newValue)) {
                    angular.forEach(newValue, function (value, key) {

                        TaskManager.updateTask(value).then(function (response) {


                        });

                    });
                }
            }, true);
            $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
                return assignedUser.user.kind === 'player' && assignedUser.isPresent;
            });
        });

        $scope.forTask = [];

        setTimeout(function () {
            angular.forEach($scope.myPlayers, function (item, key) {

                $scope.forTask.push({
                    value: item.user.player.firstName.toLowerCase()+' '+item.user.player.lastName.toLowerCase() ,
                    id: item.user._id,
                    display: item.user.player.firstName + ' ' + item.user.player.lastName
                })
            });

        }, 1000)


        function querySearch(query) {
            var results = query ? $scope.forTask.filter(createFilterFor(query)) : $scope.forTask,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function selectedItemChange(item) {
            if ($scope.task.length > 0) {
                if (angular.isObject(item) && item.hasOwnProperty('id')) {
                    $scope.task[0].taskFor = item.id;
                }
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }

        $scope.viewTask = function (id) {

            TaskManager.getTaskById(id).then(function (task) {

                $scope.task = task.data;
                $rootScope.task = task.data;
                $scope.task[0].dueDate = new Date($scope.task[0].dueDate);
                $scope.task[0].subtask = [];
                $scope.selectedItem = [];

                if ($scope.task[0].taskFor !=null) {
                    User.getUserById({id:$scope.task[0].taskFor}).$promise.then(function(response){
                        $scope.selectedItem = {
                            display: response.player.firstName+' '+response.player.lastName,
                            value: response.player.firstName.toLowerCase()+' '+response.player.lastName.toLowerCase() ,
                            id:response._id
                        };
                    });
                }

                TaskManager.getSubTasks($scope.task[0]._id).then(function (result) {
                    var subTasks = result.data;
                    angular.forEach(subTasks, function (value, key) {
                        value.dueDate = new Date(value.dueDate);
                    });
                    $scope.task[0].subtask = subTasks;

                });
                TaskManager.getSubTasks($rootScope.task[0]._id).then(function (result) {
                    var subTasks = result.data;
                    angular.forEach(subTasks, function (value, key) {
                        value.dueDate = new Date(value.dueDate);
                    });
                    $rootScope.task[0].subtask = subTasks;

                });
                $scope.$watch("task[0]", function (newValue, oldValue) {
                    if (angular.isObject(newValue)) {
                        newValue.id_ = $scope.user._id;

                        TaskManager.updateTask(newValue).then(function (response) {
                            $scope.tasks = response.data;
                        });
                    }
                }, true);

                $scope.$watch("task[0].subtask", function (newValue, oldValue) {
                    if (angular.isObject(newValue)) {
                        angular.forEach(newValue, function (value, key) {
                            if (value.dueDate == null) {
                                value.dueDate = null;
                            }
                            TaskManager.updateTask(value).then(function (response) {
                            });
                        });
                    }
                }, true);
            });

        };

        $scope.addSubTask = function (id) {
            var subTask = {
                id_user: null,
                taskFor: null,
                description: '',
                name: '',
                dueDate: null,
                shareWith: '',
                isComplete: false,
                parentTask: $scope.task[0]._id
            };

            $scope.task[0].subtask.push(subTask);

            TaskManager.addSubTask(subTask).then(function (response) {
                var subTasks = response.data;
                angular.forEach(subTasks, function (value, key) {
                    if (value.dueDate != null) {
                        value.dueDate = new Date(value.dueDate);
                    }
                });
                $scope.task[0].subtask = subTasks;
            });
        }

        $scope.deleteTask = function(id) {
            if (confirm('Delete Task ?')) {
                TaskManager.deleteTask(id).then(function (response){
                    $scope.task = [];
                    TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                        $scope.tasks = tasks.data;

                    });
                });
            }

        }
        $scope.deleteSubTask = function(id) {
            if (confirm('Delete Task ?')) {
                TaskManager.deleteTask(id).then(function (response){

                    TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                        $scope.tasks = tasks.data;

                    });

                    TaskManager.getSubTasks($scope.task[0]._id).then(function (result) {
                        var subTasks = result.data;
                        angular.forEach(subTasks, function (value, key) {
                            value.dueDate = new Date(value.dueDate);
                        });
                        $scope.task[0].subtask = subTasks;
                    });
                });
            }

        }

        $scope.openDialog = function(id, $event) {
            $mdDialog.show({
                controller: DialogCtrl,
                templateUrl: 'app/teams/teams.taskManager/listTasks/dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                targetEvent: $event
            });

            $rootScope.id = id;
        }


        function DialogCtrl ($timeout, $q, $scope, $mdDialog, $rootScope, User) {

            $scope.id = $rootScope.id;
            $scope.sub = $rootScope.task[0].subtask[$scope.id];
            $scope.user = [];
            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            $scope.querySearch = querySearch;
            $scope.selectedItemChange = selectedItemChange;

            User.getUserById({id:$rootScope.task[0].subtask[$scope.id].taskFor}).$promise.then(function(response){
                $scope.selectedItem = {
                    display: response.player.firstName+' '+response.player.lastName,
                    value: response.player.firstName.toLowerCase()+' '+response.player.lastName.toLowerCase() ,
                    id:response._id
                };
            });

            User.get().$promise.then(function (me) {
                $scope.user = me;

                TaskManager.getAllTasksUser(me._id).then(function (tasks) {
                    $scope.tasks = tasks.data;

                });

                $scope.$watch("tasks", function (newValue, oldValue) {
                    if (angular.isObject(newValue)) {
                        angular.forEach(newValue, function (value, key) {

                            TaskManager.updateTask(value).then(function (response) {


                            });

                        });
                    }
                }, true);
                $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
                    return assignedUser.user.kind === 'player' && assignedUser.isPresent;
                });
            });

            $scope.forTask = [];

            setTimeout(function () {
                angular.forEach($scope.myPlayers, function (item, key) {

                    $scope.forTask.push({
                        value: item.user.player.firstName.toLowerCase()+' '+item.user.player.lastName.toLowerCase() ,
                        id: item.user._id,
                        display: item.user.player.firstName + ' ' + item.user.player.lastName
                    })
                });

            }, 1000)


            function querySearch(query) {
                var results = query ? $scope.forTask.filter(createFilterFor(query)) : $scope.forTask,
                    deferred;
                if ($scope.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () {
                        deferred.resolve(results);
                    }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

            $scope.hide = function() {
                $mdDialog.hide();
            }

            function selectedItemChange(item) {

                $scope.sub.taskFor  = item.id;

                $rootScope.task[0].subtask[$scope.id].taskFor = item.id;


            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }

        }


    });