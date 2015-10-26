'use strict';

angular.module('abroadathletesApp')
  .directive('threadCreator', function (Room) {
    return {
      templateUrl: 'components/messages/thread-creator/thread-creator.html',
      restrict: 'E',
      scope: {
        roomId: '='
      },
      link: function (scope, element, attrs) {
        scope.thread = {};
        scope.create = _.debounce(function () {
          if (!_.isEmpty(scope.thread.name)) {
            Room.createThread(scope.roomId, _.clone(scope.thread));
          }
          scope.thread.name = '';
        }, 100);

        scope.onKey = function (event) {
          if (event.keyCode === 13) {
            scope.create();
            event.preventDefault();
          }
        };
      }
    };
  });
