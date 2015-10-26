'use strict';

angular.module('abroadathletesApp')
  .directive('messagesList', function (Room, Conversation) {
    return {
      templateUrl: 'components/messages/messages-list/messages-list.html',
      restrict: 'EA',
      scope: {
        roomId: '=?',
        thread: '=',
        type:'='
      },
      link: function (scope, element, attrs) {
        scope.$watch('thread', function (newThread) {
          if (!_.isEmpty(newThread)) {
            var messagesPromise;

            if (scope.type === 'room') {
              messagesPromise = Room.getMessages(scope.roomId, scope.thread._id);
            } else {
              messagesPromise = Conversation.getMessages(scope.thread._id);
            }

            messagesPromise.then(function (messages) {
              scope.messages = messages;
            });
          }
        }, true);
      }
    };
  });
