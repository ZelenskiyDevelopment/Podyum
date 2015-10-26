'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.media', {
        url: '/media',
        templateUrl: 'app/creator/creator-media/creator-media.html'
      });
  });
