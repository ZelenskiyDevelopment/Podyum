/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .controller('ListTaskCtrl', function ($scope, $rootScope, TaskManager, User, $filter, $q, $log) {

        $scope.tasks = [];
        $scope.user = [];
        $scope.task = [];

        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        //  $scope.forTask = loadAll();

        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;
        // $scope.newState = newState;

        $scope.selectedItem = {
            display: ";dsasd",
            value: 'asddssa',
            id:'dsasdadsads'
        };

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

        //  function loadAll() {
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

        //}

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

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
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
                $scope.task[0].dueDate = new Date($scope.task[0].dueDate);
                $scope.task[0].subtask = [];

                TaskManager.getSubTasks($scope.task[0]._id).then(function (result) {

                    var subTasks = result.data;
                    angular.forEach(subTasks, function (value, key) {

                        value.dueDate = new Date(value.dueDate);

                    });

                    $scope.task[0].subtask = subTasks;

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
                taskFor: '',
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
    });