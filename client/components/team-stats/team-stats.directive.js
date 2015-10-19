'use strict';

angular.module('abroadathletesApp')
  .directive('teamStats', function () {
    return {
      templateUrl: 'components/team-stats/team-stats.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });