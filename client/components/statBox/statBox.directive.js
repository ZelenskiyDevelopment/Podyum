'use strict';

angular.module('abroadathletesApp')
  .directive('statBox', function () {
    return {
      templateUrl: 'components/statBox/statBox.html',
      restrict: 'EA',
      scope: {
        header: '@',
        content: '@'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
