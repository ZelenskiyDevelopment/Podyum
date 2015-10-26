'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.coach-galery', {
        url: '/coach-galery',
        templateUrl: 'app/profile/coach/profile.coach.galery/profile.coach.galery.html',
        controller: 'ProfileCoachGaleryCtrl'
      });
  });
