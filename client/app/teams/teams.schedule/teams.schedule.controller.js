'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, User, Game, $uibModal, Teams, $rootScope) {

        $scope.showInfo = function (data) {
            console.log(data);
        };

        loadGame();

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'ModalAddGame.html',
                controller: 'addGameCtrl',
                size: size
            });
        };

        $rootScope.$on('AddGame', function (event, args) {

            Game.create(args).$promise.then(function () {

                loadGame();

            });

            $rootScope.$emit('CloseModalAddGame', {close: true});
        });


        function loadGame() {


            User.get().$promise.then(function (me) {
                $scope.user = me;

                Teams.getTeam({id:me._id}).$promise.then(function(result){

                    Game.getGames({id: result[0]._id}).$promise.then(function (games) {
                        $scope.games = games;

                    });

                });

            });

        };

    });