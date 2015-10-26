'use strict';

angular.module('abroadathletesApp')
  .controller('FriendsCtrl', function ($scope, $stateParams, User, Auth) {
    var ownerId = Auth.getCurrentUser()._id,
      userId = $stateParams.id ? $stateParams.id : ownerId;

    User.get().$promise.then(function (me) {
      $scope.user = me;
    });

    User.getUserFriends({id: userId}).$promise.then(function (users) {
      $scope.friends = users.friends;
    });

    $scope.unFriend = function (ID) {
      User.unFriendUser({id: ID});
      _.remove($scope.friends, function (item) {
        return item._id === ID;
      });
    };
  });
