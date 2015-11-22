'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorCoachCtrl', function ($scope, PlayLevels, CitizenShips) {
        $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        })
    });
