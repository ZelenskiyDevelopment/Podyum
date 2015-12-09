'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, $stateParams, Game, User, Teams) {

        $scope.games = [];

        $scope.userPromise.then(function (me) {
            if (!me.completed) {
                $location.path('/creator');
            }
            switch (me.kind) {

                case 'player':

                    Teams.getAssignRequests({id: me._id}).$promise.then(function (team) {

                        if (angular.isObject(team)) {

                            if (team.accepted) {
                                Game.getGames({id: team[0].id_team._id}).$promise.then(function (games) {
                                    $scope.games = games;
                                });
                            }

                        }

                    });


                case 'fan':
                case 'league':
                case 'media':

                    Game.getAllGames().$promise.then(function (games) {
                        $scope.games = games;
                    });

                    break;

                case 'team':
                case 'coach':
                    Teams.getTeam({id: me._id}).$promise.then(function (result) {
                        Game.getGames({id: result[0]._id}).$promise.then(function (games) {
                            $scope.games = games;
                        });
                    });
                    break;

            }
        });
    });