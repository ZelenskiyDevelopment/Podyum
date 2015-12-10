'use strict';

/**
 * @ngdoc object
 * @name abroadathletesApp.controller:CreatorMediaCtrl
 * @requires  $scope
 * @requires  CitizenShips
 * @requires  PlayLevels
 * @requires  User
 * @description
 * Creator Media Profile Controller
 */


angular.module('abroadathletesApp')
    .controller('CreatorMediaCtrl', function ($scope, PlayLevels, CitizenShips, User) {
        $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });
    });
