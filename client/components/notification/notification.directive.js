'use strict';

angular.module('abroadathletesApp')
  .directive('notification', function () {
    return {
      templateUrl: 'components/notification/notification.html',
      restrict: 'E',
      scope: {
        type: '=',
        data: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
