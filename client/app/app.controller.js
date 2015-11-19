'use strict';

angular.module('abroadathletesApp')
  .controller('AppCtrl', function ($scope, $state) {
    $scope.excludedStates = ['', 'main', 'football', 'basketball', 'creator'];
    $scope.$state = $state;
    $scope.datalists = [
      {"name": "HOME", "href":"/football"},
      {"name": "EXPLORE", "href":"/"},
      {"name": "ABOUT", "href":"/"}
    ];

    $scope.select= function(item) {
      $scope.selected = item;
    };

    $scope.isActive = function(item) {
      return $scope.selected === item;
    };
  });
