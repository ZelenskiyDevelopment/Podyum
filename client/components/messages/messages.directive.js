'use strict';

angular.module('abroadathletesApp')
  .directive('messages', function () {
    return {
      templateUrl: 'components/messages/messages.html',
      restrict: 'EA',
      scope: {
        team:'=?'
      },
      link: function (scope, element, attrs) {
        scope.search = '';
      }
    };
  });
