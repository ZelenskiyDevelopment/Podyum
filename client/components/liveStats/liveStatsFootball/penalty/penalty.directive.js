'use strict';

angular.module('abroadathletesApp')
  .directive('penalty', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/penalty/penalty.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });