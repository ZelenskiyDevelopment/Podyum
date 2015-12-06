'use strict';

angular.module('abroadathletesApp')
    .controller('StatsEditCtrl', function ($scope, $stateParams, Game, User, Teams) {
        $scope.thisGame = {};
        $scope.roster1 = [];
        $scope.roster2 = [];
        $scope.isLive = $stateParams.isLive;
        Game.get({id: $stateParams.id}).$promise.then(function (me) {
            $scope.thisGame = me;

            Teams.getPlayersByTeam({id: $scope.thisGame.team1._id}).$promise.then(function (players) {

                $scope.roster1 = [];

                angular.forEach(players, function (player) {

                    if (player.isPresent) {
                        $scope.roster1.push(player);
                    }

                });
            });

            Teams.getPlayersByTeam({id: $scope.thisGame.team2._id}).$promise.then(function (players) {

                $scope.roster2 = [];

                angular.forEach(players, function (player) {

                    if (player.isPresent) {
                        $scope.roster2.push(player);
                    }

                });
            });
        });
    });
