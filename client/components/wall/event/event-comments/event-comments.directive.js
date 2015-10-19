'use strict';

angular.module('abroadathletesApp')
  .directive('eventComments', function () {
    return {
      templateUrl: 'components/wall/event/event-comments/event-comments.html',
      restrict: 'E',
      transclude: true,
      scope: {
        comments: '='
      },
      link: function (scope, element, attrs) {
        scope.comments = scope.comments || [];
      },
      controller: function ($scope) {
        this.addComment = function (comment) {
          $scope.comments.push(comment);
        }
      }
    };
  });
