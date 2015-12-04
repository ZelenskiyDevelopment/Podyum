'use strict';

angular.module('abroadathletesApp')
  .directive('incompletePass', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/passPlay/pass/incompletePass/incompletePass.html',
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
