'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.sport', {
        url: '/sport',
        templateUrl: 'app/creator/creator-sport/creator-sport.html'
      });
  });
