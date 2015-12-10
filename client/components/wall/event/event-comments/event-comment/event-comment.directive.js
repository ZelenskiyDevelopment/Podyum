'use strict';

angular.module('abroadathletesApp')
  .directive('eventComment', function (Event) {
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
