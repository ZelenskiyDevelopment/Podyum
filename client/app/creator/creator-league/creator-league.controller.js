'use strict';

/**
 * @ngdoc object
 * @name abroadathletesApp.controller:CreatorLeagueCtrl
 * @requires  $scope
 * @requires  CitizenShips
 * @requires  User
 * @description
 * Creator League Profile Controller
 */

angular.module('abroadathletesApp')
    .controller('CreatorLeagueCtrl',function($scope, User, CitizenShips){

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });

});