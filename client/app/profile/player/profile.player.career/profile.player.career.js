'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.player-career', {
        url: '/player-career',
        templateUrl: 'app/profile/player/profile.player.career/profile.player.career.html',
        controller: 'ProfilePlayerCareerCtrl'
      });
  });
