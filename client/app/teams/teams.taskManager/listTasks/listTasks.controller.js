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

            });
        }
});