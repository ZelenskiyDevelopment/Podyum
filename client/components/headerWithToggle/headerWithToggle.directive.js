'use strict';

angular.module('abroadathletesApp')
  .directive('headerWithToggle', function () {
    return {
      templateUrl: 'components/headerWithToggle/headerWithToggle.html',
      restrict: 'EA',
      scope: {
        label: '@',
        isExpanded: '=',
        onToggle: '=?'
      }
    };
  });
