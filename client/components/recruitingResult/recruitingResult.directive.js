'use strict';

angular.module('abroadathletesApp')
  .directive('recruitingResult', function () {
    return {
      templateUrl: 'components/recruitingResult/recruitingResult.html',
      restrict: 'E',
      scope: {
        people: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
