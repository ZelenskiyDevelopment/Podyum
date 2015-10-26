'use strict';

angular.module('abroadathletesApp')
  .directive('wall', function (Event) {
    return {
      templateUrl: 'components/wall/wall.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        events: '='
      },
      link: function (scope, element, attrs) {

      },
      controller: function ($scope) {
        this.addEvent = function (event) {
          $scope.events.unshift(event);
        }
      }
    };
  });
