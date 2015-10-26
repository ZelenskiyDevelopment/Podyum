'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.coach-carerr', {
        url: '/coach-career',
        templateUrl: 'app/profile/coach/profile.coach.career/profile.coach.career.html',
        controller: 'ProfileCoachCareerCtrl'
      });
  });
