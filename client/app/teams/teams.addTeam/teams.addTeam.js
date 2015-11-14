'use strict';

angular.module('abroadathletesApp')
    .config(function($stateProvider){
        $stateProvider.
            state('teams.addTeam',{
                url:'/add-team',
                templateUrl:'app/teams/teams.addTeam/teams.addTeam.html',
                controller: 'AddTeamCtrl'
            })

    });