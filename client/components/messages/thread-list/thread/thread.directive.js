'use strict';

angular.module('abroadathletesApp')
  .directive('thread', function ($mdDialog, Room, Auth) {
    return {
      templateUrl: 'components/messages/thread-list/thread/thread.html',
      restrict: 'E',
      require: '^room-selector',
      scope: {
        thread: '=',
        roomId: '='
      },
      link: function (scope, element, attrs, roomSelectorCtrl) {
        scope.thread.isFavorite = _.contains(scope.thread.favorite, Auth.getCurrentUser()._id);

        scope.changeThread = function () {
          delete roomSelectorCtrl.getCurrentThread().isActive;
          roomSelectorCtrl.changeThread(scope.thread);
        };
        var delay = 100;
        var addToFavoriteDebounced = _.debounce(Room.addToFavorite, delay);
        var removeFromFavoriteDebounced = _.debounce(Room.removeFromFavorite, delay);

        scope.onStarClick = function () {
          if(scope.thread.isFavorite) {
            removeFromFavoriteDebounced(scope.roomId, scope.thread._id);
          } else {
            addToFavoriteDebounced(scope.roomId, scope.thread._id);
          }
          scope.thread.isFavorite = !scope.thread.isFavorite;

        };

        scope.showConfirm = function (ev, thread) {
          var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .content('Would you like to leave this thread?')
            .ariaLabel('Confirm dialog')
            .ok('leave')
            .cancel('cancel')
            .targetEvent(ev);
          $mdDialog.show(confirm).then(function () {
            Room.leaveThread(scope.roomId, thread._id);
          }, function () {

          });
        };
      }
    };
  });
