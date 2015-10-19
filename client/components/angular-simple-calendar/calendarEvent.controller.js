'use strict';

angular.module('abroadathletesApp')
  .controller('CalendarEventCtrl', function ($scope, $timeout, User) {
    User.get().$promise.then(function (me) {
      $scope.user = me;
    });
    $scope.submit = function(event) {
      User.putDataFromCreator($scope.user);
      $scope.modal.buttons[0].click(event,$scope.user);
    };
  });
