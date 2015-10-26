'use strict';

angular.module('abroadathletesApp')
  .directive('membersList', function ($mdDialog, Room) {
    return {
      templateUrl: 'components/messages/members-list/members-list.html',
      restrict: 'EA',
      scope: {
        room: '=?',
        isAdmin:'='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              $scope.users = mapData(_.map(scope.room.members, function (user) {
                return _.extend(user, {isAdmin: _.contains(scope.room.admins, user._id)});
              }));
              $scope.isAdmin = scope.isAdmin;
              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.answer = function (answer) {
                if (!_.isEmpty(answer)) {

                  answer = _(answer)
                    .filter(function (item) {
                      return item.isAdmin
                    })
                    .map('_id');
                  Room.updateRoom(scope.room._id, {admins: answer});
                  $mdDialog.hide(answer);
                }
              };
            },
            templateUrl: 'components/messages/members-list/modal-template.html',
            parent: angular.element(document.body),
            targetEvent: ev
          });
        };
        function mapData(collection) {
          return collection.map(function (item) {
            return {
              name: item[item.kind].name || item[item.kind].firstName + ' ' + item[item.kind].lastName,
              image: 'photos/' + item.profilePhoto,
              isAdmin: item.isAdmin,
              _id: item._id
            };
          });
        }
      }
    };
  });
