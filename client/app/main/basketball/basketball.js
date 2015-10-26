'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('basketball', {
        url: '/basketball',
        templateUrl: 'app/main/basketball/basketball.html',
        controller: 'BasketballCtrl'
      });
  });