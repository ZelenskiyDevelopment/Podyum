'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorPlayerCtrl', function ($scope, GamePositions) {
    $scope.selectedSports = _.keys($scope.formData.sport);
    $scope.positions = {};
    _.each($scope.selectedSports, function(sport){
      $scope.positions[sport] = GamePositions.getPositionsForSport(sport);
    });
  });
