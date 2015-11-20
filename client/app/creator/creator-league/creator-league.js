'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.league', {
        url: '/league',
        templateUrl: 'app/creator/creator-league/creator-league.html',
        controller: 'CreatorLeagueCtrl'
      });
  });
