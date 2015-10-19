'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.league-store', {
        url: '/store',
        templateUrl: 'app/profile/league/profile.league.store/profile.league.store.html',
        controller: 'ProfileLeagueStoreCtrl'
      });
  });
