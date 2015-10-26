'use strict';

angular.module('abroadathletesApp')
  .directive('showTail', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        scope.$watch(function () {
            return _.first(element).scrollHeight;
          },
          function () {
            _.first(element).scrollTop = _.first(element).scrollHeight;
          });
      }
    };
  });
