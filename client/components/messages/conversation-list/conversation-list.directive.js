'use strict';

angular.module('abroadathletesApp')
  .directive('conversationList', function (Conversation, $stateParams) {
    return {
      templateUrl: 'components/messages/conversation-list/conversation-list.html',
      restrict: 'E',
      require: '^room-selector',
      scope: {
        startConversation: '='
      },
      link: function (scope, element, attrs, roomSelectorCtrl) {
        var conversationPromise = Conversation.getConversations().then(function (conversations) {
          roomSelectorCtrl.changeThread(_.first(conversations));
          if (_.isEmpty(conversations)) {
            setUpWatch(scope);
          }
          scope.conversations = conversations;
          return conversations;
        });

        if (!_.isEmpty($stateParams.threadId)) {
          conversationPromise.then(function (result) {
            var thread = _.find(result, function (thread) {
              return thread._id === $stateParams.threadId;
            });

            if (!_.isEmpty(thread)) {
              roomSelectorCtrl.changeThread(thread);
            }
          });
        }

        function setUpWatch(scope) {
          var watch = scope.$watchCollection('conversations', function (conversations) {
            if (!_.isEmpty(conversations)) {
              roomSelectorCtrl.changeThread(scope.startConversation || _.first(conversations));
              watch();
            }
          });
        }


      }
    };
  });
