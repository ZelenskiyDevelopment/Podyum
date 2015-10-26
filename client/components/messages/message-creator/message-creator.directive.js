'use strict';

angular.module('abroadathletesApp')
  .directive('messageCreator', function (Room, Conversation) {
    return {
      templateUrl: 'components/messages/message-creator/message-creator.html',
      restrict: 'E',
      scope: {
        roomId: '=?',
        thread: '=',
        type:'='
      },
      link: function (scope, element, attrs) {
        scope.message = '';
        scope.createMessage = _.debounce(function () {
          if (!_.isEmpty(scope.message)) {
            if(scope.type === 'room') {
              Room.createMessage(scope.roomId, scope.thread._id, {content: _.clone(scope.message)});
            } else {
              Conversation.createMessage(scope.thread._id, {content: _.clone(scope.message)});
            }
          }
          scope.message = '';
        }, 100);

        scope.onKey = function(event){
          if(event.keyCode === 13 && !event.shiftKey){
            scope.createMessage();
            event.preventDefault();
          }
        };
      }
    };
  });
