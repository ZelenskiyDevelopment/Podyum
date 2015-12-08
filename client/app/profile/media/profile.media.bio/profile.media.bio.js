'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.media-bio', {
        url: '/media-bio',
        templateUrl: 'app/profile/media/profile.media.bio/profile.media.bio.html',
      });
  });
