'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorCoachCtrl', function ($scope, PlayLevels, CitizenShips, $log) {
        $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};
        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });

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
        }

        function createFilterFor(query) {

            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                console.log(state);
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }



    });
