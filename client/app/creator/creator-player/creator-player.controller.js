'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorPlayerCtrl', function ($scope, GamePositions, AwardsPlayer, CategoriesLevel, LevelsCollege, CitizenShips, $window, User, $log) {

        window.scrollTo(0, 0);

        $scope.selectedSports = _.keys($scope.formData.sport);
        $scope.positions = {};
        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;
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
        };

        $scope.remove = function (index) {
            $scope.formData.categoriesLevel.splice(index, 1);
            $scope.formData.years.splice(index, 1);
        };

        $scope.teams = [];

        angular.forEach($scope.allTeams, function (item, key) {

            $scope.teams.push({
                value: item.teamName.toLowerCase(),
                logo: item.logoTeam,
                address: item.address,
                display: item.teamName.toLowerCase(),
                oldCoach: item.id_user,
                id: item._id
            })

        });

        function querySearch(query) {
            var results = query ? $scope.teams.filter(createFilterFor(query)) : $scope.forTask,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                console.log(results);
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $scope.formData.selectedTeam = item;
            $log.info('Item changed to ' + JSON.stringify(item));
            console.log($scope.formData.selectedTeam);
        }

        function createFilterFor(query) {

            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                console.log(state);
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }


    });
