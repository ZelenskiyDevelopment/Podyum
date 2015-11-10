/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .controller('ListTaskCtrl', function($scope, $rootScope, TaskManager, User, $filter) {

        $scope.tasks = [];
        $scope.user = [];
        $scope.task = [];
        User.get().$promise.then(function (me) {
            $scope.user = me;

            TaskManager.getAllTasksUser(me._id).then(function(tasks) {
                $scope.tasks = tasks.data;
            })

        });


        $scope.viewTask = function(id) {

            TaskManager.getTaskById(id).then(function(task){

              $scope.task = task.data;
              $scope.task[0].dueDate = new Date($scope.task[0].dueDate);
                $scope.task[0].subtask = [];
                $scope.$watch("task[0]", function(newValue, oldValue) {

                    if (angular.isObject(newValue)) {
                        TaskManager.updateTask(newValue).then(function(response){

                        });

                    }
                },true);
            });

        };

        $scope.addSubTask = function(id) {

            $scope.task[0].subtask.push({
                id_user:'',
                taskFor:'',
                description:'',
                name:'',
                dueDate:'',
                shareWith:'',
                isComplete: false,
                parentTask:$scope.task[0]._id

            })

        }

        function isEquivalent(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            if (aProps.length != bProps.length) {
                return false;
            }

            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }

            return true;
        }


});