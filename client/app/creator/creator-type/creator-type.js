'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.type', {
        url: '/type',
        templateUrl: 'app/creator/creator-type/creator-type.html'
      });
  });
