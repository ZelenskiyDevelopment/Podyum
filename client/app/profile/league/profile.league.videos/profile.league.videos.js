'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.league-videos', {
        url: '/videos',
        templateUrl: 'app/profile/league/profile.league.videos/profile.league.videos.html',
        controller: 'ProfileLeagueVideosCtrl'
      });
  });
