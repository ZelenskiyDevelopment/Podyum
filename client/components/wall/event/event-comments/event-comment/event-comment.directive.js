'use strict';

angular.module('abroadathletesApp')
  .directive('eventComment', function () {
    return {
      templateUrl: 'components/wall/event/event-comments/event-comment/event-comment.html',
      restrict: 'E',
      scope: {
        comment: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
