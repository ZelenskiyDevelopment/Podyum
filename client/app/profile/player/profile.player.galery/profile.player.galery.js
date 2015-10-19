'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.player-galery', {
        url: '/player-galery',
        templateUrl: 'app/profile/player/profile.player.galery/profile.player.galery.html',
        controller: 'ProfilePlayerGaleryCtrl'
      });
  });
