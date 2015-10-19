'use strict';

angular.module('abroadathletesApp')
  .controller('AppCtrl', function ($scope, $state) {
    $scope.excludedStates = ['', 'main', 'football', 'basketball', 'creator'];
    $scope.$state = $state;
  });
