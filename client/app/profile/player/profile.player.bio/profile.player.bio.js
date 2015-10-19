'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.player-bio', {
        url: '/player-bio',
        templateUrl: 'app/profile/player/profile.player.bio/profile.player.bio.html',
      });
  });
