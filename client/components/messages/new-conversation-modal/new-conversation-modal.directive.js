'use strict';

angular.module('abroadathletesApp')
  .directive('newConversationModal', function ($mdDialog, Conversation, Auth) {
    return {
      templateUrl: 'components/messages/new-conversation-modal/new-conversation-modal.html',
      restrict: 'EA',
      scope: {},
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              if (!_.isUndefined(scope.room)) {
                $scope.conversation = {};
              }

              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.answer = function (answer) {
                if (!_.isEmpty(answer.message) && !_.isEmpty(answer.members)) {
                  var newConversation = {
                    members: _.map(answer.members, '_id'),
                    messages:[{
                      author: Auth.getCurrentUser()._id,
                      content: answer.message
                    }]
                  };
                  Conversation.createConversations(newConversation);
                  $mdDialog.hide();
                }
              };
            },
            templateUrl: 'components/messages/new-conversation-modal/modal-template.html',
            targetEvent: ev,
            parent: angular.element(document.body),
            disableParentScroll: false
          });
        };
      }
    };
  });
