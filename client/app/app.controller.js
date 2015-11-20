'use strict';

angular.module('abroadathletesApp')
  .controller('AppCtrl', function ($scope, $state) {
    $scope.excludedStates = ['', 'main', 'about', 'football', 'basketball', 'creator'];
    $scope.$state = $state;
    $scope.datalists = [
      {"name": "HOME", "href":"/"},
      {"name": "EXPLORE", "href":"/"},
      {"name": "ABOUT", "href":"/about"}
    ];

    $scope.select= function(item) {
      $scope.selected = item;
    };

    $scope.isActive = function(item) {
      return $scope.selected === item;
    };
  });
