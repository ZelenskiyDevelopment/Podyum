'use strict';

angular.module('abroadathletesApp')
    .directive('gameSchedule', function () {
        return {
            templateUrl: 'components/game-schedule/game-schedule.html',
            restrict: 'E',
            scope: {},
            controller: function($scope){

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
