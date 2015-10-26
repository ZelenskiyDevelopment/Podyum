'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.league-contact', {
        url: '/contact',
        templateUrl: 'app/profile/league/profile.league.contact/profile.league.contact.html',
        controller: 'ProfileLeagueContactCtrl'
      });
  });
