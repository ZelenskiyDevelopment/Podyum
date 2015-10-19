'use strict';

angular.module('abroadathletesApp')
  .directive('profilePlayerStats', function () {
    return {
      templateUrl: 'components/profilePlayerStats/profilePlayerStats.html',
      restrict: 'EA',
      scope: {
        sport: '=',
        user: '='
      },
      link: function (scope,$scope, element, attrs) {
        $scope.user = scope.user;
      }
    };
  });
