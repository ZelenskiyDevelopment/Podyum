'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.player', {
        url: '/player',
        templateUrl: 'app/creator/creator-player/creator-player.html',
        controller: 'CreatorPlayerCtrl'
      });
  });
