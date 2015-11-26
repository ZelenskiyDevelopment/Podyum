'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, User, Game, $uibModal, Teams, $rootScope, $state) {

        $scope.showInfo = function(data) {
            console.log(data);
        };

        User.get().$promise.then(function (me) {
            $scope.user = me;

            Teams.getTeam({id:me._id}).$promise.then(function(result){

                Game.getGames({id: result[0]._id}).$promise.then(function (games) {
                    $scope.games = games;

                });

            });

            console.log($scope.games);
        });

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'ModalAddGame.html',
                controller: 'addGameCtrl',
                size: size
            });
        };

});