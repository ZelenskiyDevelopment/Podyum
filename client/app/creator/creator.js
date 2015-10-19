'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator', {
        url: '/creator',
        templateUrl: 'app/creator/creator.html',
        controller: 'CreatorCtrl'
      });
  });
