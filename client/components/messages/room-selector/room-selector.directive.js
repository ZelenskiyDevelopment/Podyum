'use strict';

angular.module('abroadathletesApp')
  .directive('roomSelector', function (Room, $stateParams, Auth, $mdDialog) {
    return {
      templateUrl: 'components/messages/room-selector/room-selector.html',
      restrict: 'E',
      require: '^room-selector',
      scope: {
        search: '=',
        team: '=?'
      },
      link: function (scope, element, attrs, ctrl) {
        scope.rooms = [];
        scope.selectedThread = undefined;
        var roomsPromise = Room.getRooms().then(function (result) {
          scope.allRooms = result;
          scope.$watch('allRooms.length', function () {
            if (_.isEmpty(scope.team)) {
              if (Auth.getCurrentUser().kind === 'team') {
                return scope.rooms = result;
              } else {
                return scope.rooms = _.filter(result, function (room) {
                  return _.isUndefined(room.team);
                });
              }
            } else {
              return scope.rooms = _.filter(result, function (room) {
                return room.team === scope.team._id;
              });
            }
          });
        });

        scope.setType = function(type) {
          scope.type = type;
        };

        scope.resetThread = function () {
          if (!_.isUndefined(scope.selectedThread)) {
            delete scope.selectedThread.isActive;
          }
          scope.selectedThread = undefined;
        };

        scope.checkIsAdmin = function (index) {
          scope.isAdmin = _.contains(scope.rooms[index].admins, Auth.getCurrentUser()._id);
          scope.type = 'room';
        };

        scope.leaveRoom = function (ev, roomId) {
          var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .content('Would you like to leave this room?')
            .ariaLabel('Confirm dialog')
            .ok('leave')
            .cancel('cancel')
            .targetEvent(ev);
          $mdDialog.show(confirm).then(function () {
            Room.leaveRoom(roomId).then(function () {
              _.remove(scope.allRooms, function (room) {
                return room._id === roomId;
              })
            });
          });
        };

        if (!_.isEmpty($stateParams.roomId)) {

            roomsPromise.then(function (result) {
              if($stateParams.roomId === 'others' && _.isUndefined(scope.team)) {
                ctrl.changeRoom(result.length);
              } else {
              var roomIndex = _.findIndex(result, function (item) {
                return item._id === $stateParams.roomId;
              });

              if (!_.isEmpty(result[roomIndex])) {
                ctrl.changeRoom(roomIndex);
              }
            }
            });

        }
      },
      controller: function ($scope) {
        this.changeThread = function (thread) {
          if (!_.isUndefined(thread)) {
            $scope.selectedThread = thread;
            $scope.selectedThread.isActive = true;
          }
        };

        this.changeRoom = function (roomIndex) {
          $scope.selectedIndex = roomIndex;
        };

        this.getCurrentThread = function () {
          return $scope.selectedThread;
        };
      }
    };
  });
