'use strict';

/**
 * @ngdoc object
 * @name abroadathletesApp.controller:CreatorTeamCtrl
 * @requires  $scope
 * @requires  PlayLevels
 * @requires  CitizenShips
 * @requires  User
 * @description
 * Creator Team Profile Controller
 */

angular.module('abroadathletesApp')
  .controller('CreatorTeamCtrl', function ($scope, PlayLevels, CitizenShips, User) {
    $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });
  });
