'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.team-coaching', {
        url: '/coaching',
        templateUrl: 'app/profile/team/profile.team.coaching/profile.team.coaching.html',
        controller: 'ProfileTeamCoachingCtrl'
      });
  });
