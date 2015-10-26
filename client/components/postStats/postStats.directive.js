'use strict';

angular.module('abroadathletesApp')
  .directive('postStats', function () {
    return {
      templateUrl: 'components/postStats/postStats.html',
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
