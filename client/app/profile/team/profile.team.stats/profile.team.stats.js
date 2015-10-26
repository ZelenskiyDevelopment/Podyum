'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.team-stats', {
        url: '/team-stats',
        templateUrl: 'app/profile/team/profile.team.stats/profile.team.stats.html',
        controller: 'ProfileTeamStatsCtrl'
      });
  });
