'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.coach-bio', {
        url: '/coach-bio',
        templateUrl: 'app/profile/coach/profile.coach.bio/profile.coach.bio.html',
        controller: 'ProfileCoachBioCtrl'
      });
  });
