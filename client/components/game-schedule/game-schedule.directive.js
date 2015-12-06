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
                update: '=',
                userid: '=?',
                viewall: '='
            },
            controller: function ($scope, Teams, Game) {

                $scope.delete = function(index,id) {
                    if (confirm('Delete game ?')) {

                        Game.delete({id:id}).$promise.then(function(){
                            $scope.update();
                        });

                    }
                };

            },
            link: function (scope, element, attrs) {

                scope.showInfo = function () {
                    if (element.find('.section-info-team').css('display') === 'none') {
                        element.find('.section-info-team').css('display', 'block');
                    } else {
                        element.find('.section-info-team').css('display', 'none');
                    }
                };

            }
        };
    });
