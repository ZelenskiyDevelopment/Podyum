'use strict';

angular.module('abroadathletesApp')
  .directive('navigationbar', function (Auth, $state) {
    return {
      templateUrl: 'components/navigationbar/navigationbar.html',
      scope: {},
      restrict: 'EA',
      controller: 'NavbarCtrl',
      link: function (scope, element, attrs) {
        scope.user = Auth.getCurrentUser();
        scope.messageNumber = 0;
        scope.messages = Auth.getCurrentUser().messages;

        scope.goToConversation = function (roomId, threadId) {
          $state.go('home.messages', {
            roomId: roomId,
            threadId: threadId
          });
        };
      }
    };
  });
