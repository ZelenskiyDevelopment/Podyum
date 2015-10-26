'use strict';

angular.module('abroadathletesApp')
  .controller('SearchCtrl', function ($scope, $stateParams, User, $location) {
    $scope.getMore = angular.noop;
    $scope.NoOfMore = 0;
    $scope.users = [];
    $scope.moreVissible = true;

    if ($stateParams.pattern) {

      $scope.getMore = function () {
        $scope.NoOfMore += 1;
        User.search({
          pattern: $stateParams.pattern,
          limit: 10,
          skip: 10 * $scope.NoOfMore
        }).$promise.then(function (users) {
            $scope.users.push.apply($scope.users, users);
            if (users.length < 10) {
              $scope.moreVissible = false;
            }
          });
      };
      $scope.getMore();

    } else {
      $location.path('/home');
    }


  });
