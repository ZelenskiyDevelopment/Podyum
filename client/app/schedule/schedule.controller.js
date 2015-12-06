'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, $stateParams, Game, User, Teams) {

        $scope.games = [];

        Game.getAllGames().$promise.then(function (games) {
            $scope.games = games;
        });


    });