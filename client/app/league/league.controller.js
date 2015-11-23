'use strict';

angular.module('abroadathletesApp')
    .controller('LeagueCtrl', function($scope, User, League){

        $scope.league = [];

        User.get().$promise.then(function (me) {
            if(!me.completed){
                $location.path('/creator');
            }

            League.getLeague(me._id).then(function(result){

                $scope.league  = result.data;
            });
        });


    });