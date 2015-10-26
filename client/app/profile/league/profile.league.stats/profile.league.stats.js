'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.league-stats', {
        url: '/league-stats',
        templateUrl: 'app/profile/league/profile.league.stats/profile.league.stats.html',
        controller: 'ProfileLeagueStatsCtrl'
      });
  });
