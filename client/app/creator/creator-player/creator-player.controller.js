'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorPlayerCtrl', function ($scope, GamePositions, AwardsPlayer, CategoriesLevel, LevelsCollege) {

        $scope.selectedSports = _.keys($scope.formData.sport);
        $scope.positions = {};

        _.each($scope.selectedSports, function(sport){
          $scope.positions[sport] = GamePositions.getPositionsForSport(sport);
        });

        $scope.selectedAwards = _.keys($scope.formData.sport);
        $scope.awards = {};

        _.each($scope.selectedAwards, function(awards){
            $scope.awards[awards] = AwardsPlayer.getAwards(awards);
            console.log($scope.awards[awards]);
        });

        $scope.selectedLevels = _.keys($scope.formData.sport);
        $scope.categoriesLevels = {};


        _.each($scope.selectedLevels, function(level){
            $scope.categoriesLevels[level] = CategoriesLevel.getCategories(level);
            console.log($scope.categoriesLevels[level]);
        });

        $scope.selectedCollegeLevels = _.keys($scope.formData.sport);
        $scope.collegeLevels =  {};

        _.each($scope.selectedCollegeLevels, function(level){
            $scope.collegeLevels[level] = LevelsCollege.getLevel(level);
            console.log($scope.collegeLevels[level]);
        })

    });
