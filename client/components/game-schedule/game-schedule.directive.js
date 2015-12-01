'use strict';

angular.module('abroadathletesApp')
    .directive('gameSchedule', function () {
        return {
            templateUrl: 'components/game-schedule/game-schedule.html',
            restrict: 'E',
            scope: {
                team1: '=',
                team2: '=',
                league: '=',
                stadium: '=',
                date: '=',
                data: '=',
                sport: '=',
                stream: '=',
                id: '=',
                userdata: '=',
                place: '=',
                time: '=',
                index: '=',
                userid: '=?'
            },
            controller: function ($scope, Teams) {


                Teams.getTeamById({id: $scope.team1}).$promise.then(function (result) {
                    $scope.team1 = result;
                });
                Teams.getTeamById({id: $scope.team2}).$promise.then(function (result) {
                    $scope.team2 = result;

                });

            },
            link: function (scope, element, attrs) {
                scope.showInfo = function () {
                    if (element.find('.section-info-team').css('display') === 'none') {
                        element.find('.section-info-team').css('display', 'block');
                    } else {
                        element.find('.section-info-team').css('display', 'none');
                    }
                };

                scope.delete = function($index,id) {
                    console.log($index);
                    console.log(id);
                };
            }
        };
    });
