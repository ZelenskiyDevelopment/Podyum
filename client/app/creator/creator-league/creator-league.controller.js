'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorLeagueCtrl',function($scope, User, CitizenShips){

        $scope.selectedCitizenShips =  _.keys($scope.formData.sport);
        $scope.CitizenShips = {};

        _.each($scope.selectedCitizenShips, function(value){
            $scope.CitizenShips[value] = CitizenShips.getCitizenShips(value);
            console.log($scope.CitizenShips[value]);
        });

});