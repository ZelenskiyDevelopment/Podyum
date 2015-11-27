'use strict';

angular.module('abroadathletesApp')
    .controller('addGameCtrl', function ($scope, Game, User, League, Teams, $uibModalInstance, $rootScope) {

        $scope.leagues = [];
        $scope.allTeams = {};
        $scope.teams = [];
        $scope.team = [];
        $scope.game = {};
        $scope.game.league = '';
        $scope.team1 = '';
        $scope.game.team2 = '';
        User.get().$promise.then(function (me) {
            League.getAll().then(function (result) {
                $scope.leagues = result.data;

            });
            $scope.user = me;

            Teams.getTeam({id: me._id}).$promise.then(function (result) {

                $scope.team1 = result;
            });
        });


        Teams.getAllTeam().$promise.then(function (result) {
            $scope.teams = result;
        });

        $scope.onChange = function (value) {
            Teams.getAllTeam().$promise.then(function (result) {
                angular.forEach(result, function (item, key) {

                    angular.forEach(item.myLeagues, function (league, key) {

                        if (league.user == value) {

                            $scope.teams.push(item);
                        }

                    });
                });
            });

        };

        $scope.save = function () {

            var time = new Date($scope.time);

            $scope.game.sport = 'football';
            $scope.game.time = time;
            $scope.game.team1 = $scope.team1[0]._id;
            $rootScope.$emit('AddGame', $scope.game);
        };

        $rootScope.$on('CloseModalAddGame', function(event, args) {

            if (args.close) {
                $uibModalInstance.dismiss('close');
            }

        });



        $scope.close = function() {
            $uibModalInstance.dismiss('close');
        };
    });