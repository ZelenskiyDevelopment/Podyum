'use strict';

angular.module('abroadathletesApp').controller('sendMessageModalController', function ($scope, room, receiver, $mdDialog, Conversation, Auth) {
  console.log(receiver);
  if (!_.isUndefined(room)) {
    $scope.conversation = {};
  }
  $scope.receiver = receiver;
  $scope.hide = $mdDialog.hide;
  $scope.cancel = $mdDialog.cancel;
  $scope.answer = function (answer) {

   if (!_.isEmpty(answer.message)) {

      var receivers = [];
      receivers.push(receiver._id);

      var newConversation = {
        members: receivers,
        messages:[{
          author: Auth.getCurrentUser()._id,
          content: answer.message
        }]
      };
      Conversation.createConversations(newConversation);
      $mdDialog.hide();
   }
  };

});





