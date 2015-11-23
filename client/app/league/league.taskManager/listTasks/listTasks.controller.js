/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .controller('ListTaskCtrlLeague', function ($scope, $rootScope, TaskManager, User, $filter, $q, $log, $mdDialog, $timeout) {


        var secondsToWaitBeforeSave = 2;

        $scope.tasks = [];
        $scope.user = [];
        $scope.task = [];
        $scope.MyTasks = [];
        var TaskWatcher;
        var TaskSubWatcher;
        $rootScope.task = [];
        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;

        $scope.selectedItem = {
            display: '',
            value: '',
            id: ''
        };

        User.get().$promise.then(function (me) {
            $scope.user = me;

            TaskManager.getAllTasksUser(me._id).then(function (tasks) {
                $scope.tasks = tasks.data;

            });

            TaskManager.getMyTask(me._id).then(function (tasks) {

                $scope.MyTasks = tasks.data;

            });

            $scope.$watch("tasks", function (newValue, oldValue) {
                if (angular.isObject(newValue)) {
                    angular.forEach(newValue, function (value, key) {

                        // TaskManager.updateTask(value).then(function (response) {


                        //});

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
                    value: item.user.player.firstName.toLowerCase() + ' ' + item.user.player.lastName.toLowerCase(),
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
                    $scope.taskView[0].taskFor = item.id;
                }
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }

        var updateTask = function () {

            if (angular.isObject($scope.task)) {


                TaskManager.updateTask($scope.taskView[0]).then(function (response) {
                    $scope.tasks = response.data;
                });
            }
        };

        var updateSubTask = function (subTask, oldVal) {
            if (angular.isObject(subTask)) {


                if (!angular.isUndefined(oldVal)) {
                    if (!angular.equals(subTask, oldVal)) {

                        if (subTask.dueDate == null) {
                            subTask.dueDate = null;
                        }
                        TaskManager.updateTask(subTask).then(function (response) {

                        });
                    }

                }


            }
        }

        var WatchTaskUpdate = function (newVal, oldVal) {
            var timeout = null;
            if (!angular.equals(newVal, oldVal)) {

                if (timeout) {
                    $timeout.cancel(timeout);
                }

                timeout = $timeout(updateTask, secondsToWaitBeforeSave * 1000);
            }
            if (angular.isObject($scope.taskView)) {
                //  console.log($scope.taskView);
            }

        };

        var WatchSubTaskUpdate = function (newVal, oldVal) {

            var timeout = null;

            if (!angular.equals(newVal, oldVal)) {

                if (timeout) {
                    $timeout.cancel(timeout);
                }

                timeout = $timeout(updateSubTask(newVal, oldVal), 5000);
            }

        };


        $scope.viewTask = function (id) {

            TaskManager.getTaskById(id).then(function (task) {

                $scope.taskView = [];
                $rootScope.taskView = [];
                $scope.subTaskView = [];
                $rootScope.subTaskView = [];
                $scope.selectedItem = [];

                $scope.taskView = task.data;
                $rootScope.taskView = task.data;
                $scope.taskView[0].dueDate = new Date($scope.taskView[0].dueDate);


                if ($scope.taskView[0].taskFor != null) {
                    User.getUserById({id: $scope.taskView[0].taskFor}).$promise.then(function (response) {
                        $scope.selectedItem = {
                            display: response.player.firstName + ' ' + response.player.lastName,
                            value: response.player.firstName.toLowerCase() + ' ' + response.player.lastName.toLowerCase(),
                            id: response._id
                        };
                    });
                }

                TaskManager.getSubTasks($scope.taskView[0]._id).then(function (result) {
                    var subTasks = result.data;
                    angular.forEach(subTasks, function (value, key) {
                        if (value.dueDate === null) {
                            value.dueDate = new Date();
                        } else {
                            value.dueDate = new Date(value.dueDate);
                        }

                    });
                    $scope.subTaskView = subTasks;
                    $rootScope.subTaskView = subTasks;


                }).finally(function () {

                    angular.forEach($scope.subTaskView, function (value, key) {
                        TaskSubWatcher = $scope.$watch("subTaskView[" + key + "]", WatchSubTaskUpdate, true);

                    });

                });

            }).finally(function () {


                TaskWatcher = $scope.$watch("taskView[0]", WatchTaskUpdate, true);
            });

            if (angular.isFunction(TaskWatcher)) {
                TaskWatcher();
            }
            if (angular.isFunction(TaskSubWatcher)) {
                TaskSubWatcher();
            }
        };

        $scope.saveChange = function () {

        }

        $scope.addSubTask = function (id) {
            var subTask = {
                id_user: null,
                taskFor: null,
                description: '',
                name: '',
                dueDate: null,
                shareWith: '',
                isComplete: false,
                parentTask: $scope.taskView[0]._id
            };

            $scope.subTaskView.push(subTask);

            TaskManager.addSubTask(subTask).then(function (response) {
                var subTasks = response.data;
                angular.forEach(subTasks, function (value, key) {
                    if (value.dueDate != null) {
                        value.dueDate = new Date(value.dueDate);
                    }
                    TaskSubWatcher = $scope.$watch("subTaskView[" + key + "]", WatchSubTaskUpdate, true);

                });

                $scope.subTaskView = subTasks;
            });
        }

        $scope.deleteTask = function (id) {
            if (confirm('Delete Task ?')) {
                TaskManager.deleteTask(id).then(function (response) {
                    $scope.task = [];
                    TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                        $scope.tasks = tasks.data;

                    });
                });
            }

        }
        $scope.deleteSubTask = function (id) {
            if (confirm('Delete Task ?')) {
                TaskManager.deleteTask(id).then(function (response) {

                    TaskManager.getAllTasksUser($scope.user._id).then(function (tasks) {
                        $scope.tasks = tasks.data;

                    });

                    TaskManager.getSubTasks($scope.taskView[0]._id).then(function (result) {
                        var subTasks = result.data;
                        angular.forEach(subTasks, function (value, key) {
                            value.dueDate = new Date(value.dueDate);
                        });
                        $scope.subTaskView = subTasks;
                    });
                });
            }

        }

        $scope.openDialog = function (id, $event) {
            $mdDialog.show({
                controller: DialogCtrl,
                templateUrl: 'app/teams/teams.taskManager/listTasks/dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: $event
            });

            $rootScope.id = id;
        }

        Object.compare = function (obj1, obj2) {
            //Loop through properties in object 1
            for (var p in obj1) {
                //Check property exists on both objects
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

                switch (typeof (obj1[p])) {
                    //Deep compare objects
                    case 'object':
                        if (!Object.compare(obj1[p], obj2[p])) return false;
                        break;
                    //Compare function code
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                        break;
                    //Compare values
                    default:
                        if (obj1[p] != obj2[p]) return false;
                }
            }

            //Check object 2 for any extra properties
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined') return false;
            }
            return true;
        };


        function DialogCtrl($timeout, $q, $scope, $mdDialog, $rootScope, User) {

            $scope.id = $rootScope.id;
            $scope.sub = $rootScope.subTaskView[$scope.id];
            $scope.user = [];
            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            $scope.querySearch = querySearch;
            $scope.selectedItemChange = selectedItemChange;

            User.getUserById({id: $rootScope.subTaskView[$scope.id].taskFor}).$promise.then(function (response) {
                $scope.selectedItem = {
                    display: response.player.firstName + ' ' + response.player.lastName,
                    value: response.player.firstName.toLowerCase() + ' ' + response.player.lastName.toLowerCase(),
                    id: response._id
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

                            //  TaskManager.updateTask(value).then(function (response) {


                            // });

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
                        value: item.user.player.firstName.toLowerCase() + ' ' + item.user.player.lastName.toLowerCase(),
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

            $scope.hide = function () {
                $mdDialog.hide();
            }

            function selectedItemChange(item) {

                if (angular.isObject(item) && item.hasOwnProperty('id')) {
                    $scope.sub.taskFor = item.id;

                    $rootScope.subTaskView[$scope.id].taskFor = item.id;

                }

            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }

        }


    });