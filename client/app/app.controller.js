'use strict';

angular.module('abroadathletesApp')
  .controller('AppCtrl', function ($scope, $state, twitterService) {
    $scope.excludedStates = ['', 'main', 'explore', 'about', 'football', 'basketball', 'creator'];
    $scope.$state = $state;
    $scope.datalists = [
      {"name": "HOME", "href":"/"},
      {"name": "EXPLORE", "href":"/explore"},
      {"name": "ABOUT", "href":"/about"}
    ];


    twitterService.initialize();

    $scope.select= function(item) {
      $scope.selected = item;
    };

    $scope.isActive = function(item) {
      return $scope.selected === item;
    };
  });
