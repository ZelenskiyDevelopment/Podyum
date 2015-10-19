'use strict';

angular.module('abroadathletesApp')
  .directive('search', function (User) {
    return {
      templateUrl: 'components/search/search.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope) {
        $scope.pattern = '';
        $scope.searchResult = [];
        $scope.search = function () {
          if ($scope.pattern.length > 0) {
            User.search({pattern: $scope.pattern}).$promise.then(function (users) {
              $scope.searchResult = users;
            });
          } else {
            $scope.searchResult = [];
          }
        };

      }
    };
  });
