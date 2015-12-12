'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.finish', {
        url: '/finish',
        templateUrl: 'app/creator/creator-finish/creator-finish.html',
        controller:'CreatorFinishCtrl'
      });
  });
