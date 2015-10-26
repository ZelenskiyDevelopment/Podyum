'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.player-highs', {
        url: '/player-highs',
        templateUrl: 'app/profile/player/profile.player.highs/profile.player.highs.html',
        controller: 'ProfilePlayerHighsCtrl'
      });
  });
