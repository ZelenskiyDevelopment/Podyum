'use strict';

angular.module('abroadathletesApp')
    .controller('TaskCtrl', function ($scope, $uibModalInstance, $mdDialog,  $rootScope, TaskManager, User, $log, $q, $timeout) {

        $scope.task = [];
        $scope.user = [];
        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;

        User.get().$promise.then(function (me) {
            $scope.user = me;

            $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
                return assignedUser.user.kind === 'player' && assignedUser.isPresent;
            });
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

        $scope.cancel = function() {
            $uibModalInstance.dismiss('close');
        }

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


         $scope.openDialog = function($event) {
             $mdDialog.show({
                 controller: DialogCtrl,
                 controllerAs: 'ctrl',
                 templateUrl: 'app/teams/teams.taskManager/addTask/dialog.html',
                 parent: angular.element(document.body),
                 targetEvent: $event,
                 clickOutsideToClose:true

            });
         }
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
               console.log(results);
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $scope.task.task_for = item.id;
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function createFilterFor(query) {

            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                console.log(state);
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }


});