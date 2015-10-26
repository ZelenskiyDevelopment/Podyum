'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.fan', {
        url: '/fan',
        templateUrl: 'app/creator/creator-fan/creator-fan.html'
      });
  });
