'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('football', {
        url: '/football',
        templateUrl: 'app/main/football/football.html',
        controller: 'FootballCtrl'
      });
  });
