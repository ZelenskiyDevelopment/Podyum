'use strict';

angular.module('abroadathletesApp')
    .controller('TaskCtrl', function ($scope, $uibModalInstance,  $rootScope, TaskManager, User) {

        $scope.task = [];

        $scope.user = [];

        User.get().$promise.then(function (me) {
            $scope.user = me;
        });

        $rootScope.alertMessageTask = '';

        $scope.ok = function () {

            var args = {

                taskFor: $scope.task.task_for,
                description: $scope.task.description,
                name: $scope.task.task_name,
                dueDate: $scope.task.due_date,
                shareWith: $scope.task.share_with

            };

            TaskManager.AddTask($scope.user._id, args).then(function(response){
                $uibModalInstance.dismiss('close');
            })

     };

});