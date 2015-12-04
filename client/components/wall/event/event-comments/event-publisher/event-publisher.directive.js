'use strict';

angular.module('abroadathletesApp')
  .directive('eventPublisher', function (Event) {
    return {
      templateUrl: 'components/wall/event/event-comments/event-publisher/event-publisher.html',
      restrict: 'E',
      require: '^event-comments',
      scope: {
        eventId: '='
      },
      link: function (scope, element, attrs, eventCommentsCtrl) {
        scope.comment = '';
        scope.addComment = function () {
          Event.addComment({
            id: scope.eventId,
            author: scope.author,
            comment: scope.comment
          }).$promise.then(function (result) {
              eventCommentsCtrl.addComment(result);
              scope.comment = '';
            }, function (err) {
              console.log(err);
            });
        }
      }
    };
  });
