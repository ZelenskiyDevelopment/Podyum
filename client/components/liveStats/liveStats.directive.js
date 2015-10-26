'use strict';

angular.module('abroadathletesApp')
  .directive('liveStats', function () {
    return {
      templateUrl: 'components/liveStats/liveStats.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
