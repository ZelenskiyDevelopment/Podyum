'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.player-stats', {
        url: '/player-stats',
        templateUrl: 'app/profile/player/profile.player.stats/profile.player.stats.html',
        controller: 'ProfilePlayerStatsCtrl'
      });
  });
