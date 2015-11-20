'use strict';

angular.module('abroadathletesApp')
    .config(function($stateProvider){
       $stateProvider.state('teams.updateTeam',{
            url:'/update-team',
            templateUrl:'app/teams/teams.updateTeam/teams.updateTeam.html',
            controller:'UpdateTeamCtrl'
       });
    });