'use strict';

angular.module('abroadathletesApp')
    .controller('joinToTeamCtrl', function($scope, Teams, $mdDialog, $uibModalInstance, User){

        $scope.teams = [];
        $scope.user = [];

        Teams.getAllTeam().$promise.then(function (result) {
            $scope.teams = result;
        });

        User.get().$promise.then(function (me) {
            $scope.user = me;
        });

        $scope.cancel = function() {
            $uibModalInstance.dismiss('close');
        };

       $scope.send = function(form) {

           if (form.$valid) {

               var data  = {
                   id_user: $scope.user._id,
                   id_team: $scope.team
               };
               Teams.sendRequestToTeam(data).$promise.then(function (result){
                   $scope.team = '';
                   $uibModalInstance.dismiss('close');

               });
           }



       };

    });