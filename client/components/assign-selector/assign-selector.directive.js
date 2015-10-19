'use strict';

angular.module('abroadathletesApp')
  .directive('assignSelector', function ($filter) {
    return {
      templateUrl: 'components/assign-selector/assign-selector.html',
      restrict: 'E',
      scope: {
        items: '=',
        kind: '=',
        model: '=',
        label:'='
      },
      link: function (scope, element, attrs) {
        scope.resetOneUserSelector = angular.noop;
        scope.selectedUser = null;
        scope.model = scope.model || [];

        scope.$watch('selectedUser', function () {
          if (!_.isEmpty(scope.selectedUser)) {
            scope.model.push(scope.selectedUser);
            scope.selectedUser = null;
            scope.resetOneUserSelector();
          }
        });

        scope.remove = function (index) {
          scope.model.splice(index, 1);
        };
      }
    };
  });
