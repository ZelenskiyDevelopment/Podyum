'use strict';

/**
 * @ngdoc object
 * @name abroadathletesApp.controller:CreatorFanCtrl
 * @requires  $scope
 * @requires  PlayLevels
 * @requires  CitizenShips
 * @requires  User
 * @description
 * Creator Fan Profile Controller
 */

angular.module('abroadathletesApp')
    .controller('CreatorFanCtrl', function ($scope, PlayLevels, CitizenShips, User) {
        $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });
    });
