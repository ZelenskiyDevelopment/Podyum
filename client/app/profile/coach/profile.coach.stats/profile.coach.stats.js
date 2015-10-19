'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.coach-stats', {
        url: '/coach-stats',
        templateUrl: 'app/profile/coach/profile.coach.stats/profile.coach.stats.html',
        controller: 'ProfileCoachStatsCtrl'
      });
  });
