'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.team-roster', {
        url: '/roster',
        templateUrl: 'app/profile/team/profile.team.roster/profile.team.roster.html',
        controller: 'ProfileTeamRosterCtrl'
      });
  });
