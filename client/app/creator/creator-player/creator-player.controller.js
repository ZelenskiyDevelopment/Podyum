'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorPlayerCtrl', function ($scope, GamePositions, AwardsPlayer, CategoriesLevel, LevelsCollege, CitizenShips, $window, User) {

        window.scrollTo(0, 0);

        $scope.selectedSports = _.keys($scope.formData.sport);
        $scope.positions = {};

        _.each($scope.selectedSports, function(sport){
          $scope.positions[sport] = GamePositions.getPositionsForSport(sport);
        });

        $scope.awards = [];


        var awards_array = ['Team captain','All-American','All-Conference (1st team)','All-Conference (2nd team)','All-Conference (Honorable Mention)'];


        angular.forEach(awards_array,function(value){
            $scope.awards.push({
                name: value
            })
        });

        $scope.selectedLevels = _.keys($scope.formData.sport);
        $scope.categoriesLevels = {};


        _.each($scope.selectedLevels, function(level){
            $scope.categoriesLevels[level] = CategoriesLevel.getCategories(level);
            console.log($scope.categoriesLevels[level]);
        });

        $scope.collegeLevels =  [];


       var collegeLevel  = ['Youth','High school','College-NAIA', 'College-Division 1', 'College-Division 2', 'College-Division 3', 'Semi-pro', 'International', 'Professional']

        angular.forEach(collegeLevel,function(value){
            $scope.collegeLevels.push({
                name: value
            })
        });



        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        })


        $scope.experience = [];
        $scope.experienceTable = [];

        angular.forEach(('College Semi-Pro International Professional').split(' '),function(value){
            $scope.experience.push({
                name: value
            })
        });

        $scope.addExperience  = function() {
            $scope.experienceTable.push({
                name:$scope.formData.categoriesLevel,
                years:0
            })
        }

        $scope.remove = function (index) {
            $scope.formData.categoriesLevel.splice(index, 1);
            $scope.formData.years.splice(index, 1);
        };

    });
