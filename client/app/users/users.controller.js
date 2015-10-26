'use strict';

angular.module('abroadathletesApp')
  .controller('UsersCtrl', function ($scope, User) {
    User.get().$promise.then(function (me) {
      $scope.user = me;
    });
    User.getUsers().$promise.then(function (users){
      $scope.users = users;
    });
  });
