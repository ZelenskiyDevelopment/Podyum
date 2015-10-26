'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.team-recruiting', {
        url: '/recruiting',
        templateUrl: 'app/profile/team/profile.team.recruiting/profile.team.recruiting.html',
        controller: 'ProfileTeamRecruitingCtrl'
      });
  });
