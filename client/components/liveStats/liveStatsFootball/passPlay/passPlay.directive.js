'use strict';

angular.module('abroadathletesApp')
  .directive('passPlay', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/passPlay/passPlay.html',
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
