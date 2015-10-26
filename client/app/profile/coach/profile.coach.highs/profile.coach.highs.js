'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.coach-highs', {
        url: '/coach-highs',
        templateUrl: 'app/profile/coach/profile.coach.highs/profile.coach.highs.html',
        controller: 'ProfileCoachHighsCtrl'
      });
  });
