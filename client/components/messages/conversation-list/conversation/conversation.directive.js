'use strict';

angular.module('abroadathletesApp')
  .directive('conversation', function () {
    return {
      templateUrl: 'components/messages/conversation-list/conversation/conversation.html',
      restrict: 'E',
      require: '^room-selector',
      scope: {
        conversation:'='
      },
      link: function (scope, element, attrs, roomSelectorCtrl) {
        if(_.get(roomSelectorCtrl.getCurrentThread(),'_id') !== scope.conversation._id){
          delete scope.conversation.isActive;
        }

        scope.name = _.map(scope.conversation.members, function(user){
          if(user.kind === 'team' || user.kind === 'league'){
            return user[user.kind].name;
          }
          return user[user.kind].firstName + ' ' + user[user.kind].lastName;
        }).join(', ');
        scope.changeThread = function () {
          delete roomSelectorCtrl.getCurrentThread().isActive;
          roomSelectorCtrl.changeThread(scope.conversation);
        };
      }
    };
  });
