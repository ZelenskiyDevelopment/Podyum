'use strict';

angular.module('abroadathletesApp')
  .directive('starCheckbox', function () {
    return {
      templateUrl: 'components/star-checkbox/star-checkbox.html',
      restrict: 'E',
      scope: {
        model: '='
      },
      link: function (scope) {
        scope.model = scope.model || false;
        var checked = 'assets/images/rating_star_on.png',
          unchecked = 'assets/images/rating_star_off.png';

        scope.$watch('model', function () {
          scope.icon = scope.model ? checked : unchecked;
        });
      }
    };
  });
