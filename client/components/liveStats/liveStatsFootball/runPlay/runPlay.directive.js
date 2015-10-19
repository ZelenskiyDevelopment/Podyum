'use strict';

angular.module('abroadathletesApp')
  .directive('runPlay', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/runPlay/runPlay.html',
      restrict: 'EA',
      scope: {
        status: '=',
        swap: '=',
        game: '=',
        team: '=',
        events: '=',
        submit: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
