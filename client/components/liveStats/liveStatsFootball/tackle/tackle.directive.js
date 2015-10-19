'use strict';

angular.module('abroadathletesApp')
  .directive('tackle', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/tackle/tackle.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
