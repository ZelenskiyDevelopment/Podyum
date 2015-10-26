'use strict';

angular.module('abroadathletesApp')
  .directive('newRoomModal', function ($mdDialog, Room) {
    return {
      templateUrl: 'components/messages/new-room-modal/new-room-modal.html',
      restrict: 'EA',
      scope: {
        room: '=?',
        team: '=?'
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              if (!_.isUndefined(scope.room)) {
                $scope.room = {};
                $scope.team = scope.team;
                $scope.room.title = _.clone(scope.room.title);
                $scope.room.members = _.clone(scope.room.members);
              }

              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.answer = function (answer) {
                if (!_.isEmpty(answer.title) && !_.isEmpty(answer.members)) {
                  answer.members = _.map(answer.members, '_id');
                  if (_.isUndefined(scope.room)) {
                    if(!_.isUndefined(scope.team)){
                      answer.team = scope.team._id;
                    }
                    Room.createRoom(answer);
                  } else {
                    Room.updateRoom(scope.room._id, answer);
                  }
                  $mdDialog.hide();
                }
              };
            },
            templateUrl: 'components/messages/new-room-modal/modal-template.html',
            targetEvent: ev,
            parent: angular.element(document.body),
            disableParentScroll: false
          });
        };
      }
    };
  });
