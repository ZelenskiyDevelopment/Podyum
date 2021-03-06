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
        submit: '=',
        runner: '=',
        topPlayersPlay: '='
      },
      controller: function($scope) {
      },
      link: function (scope, element, attrs) {
      }
    };
  });
