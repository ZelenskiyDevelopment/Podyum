'use strict';

angular.module('abroadathletesApp')
    .directive('gameSchedule', function () {
        return {
            templateUrl: 'components/game-schedule/game-schedule.html',
            restrict: 'E',
            scope: {
                team1:'=',
                team2:'=',
                league:'=',
                date:'=',
                data:'=',
                sport:'=',
                id:'=',
                userdata:'=',
                userid:'=?'
            },
            controller: function($scope){
                    console.log($scope.team2);
            },
            link: function (scope, element, attrs) {


                scope.showInfo  = function(){
                    if (element.find('.section-info-team').css('display') === 'none') {
                        element.find('.section-info-team').css('display','block');
                    } else {
                        element.find('.section-info-team').css('display','none');
                }

                }
            }
        };
    });
