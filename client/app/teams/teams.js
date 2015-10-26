'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/teams',
        templateUrl: 'app/teams/teams.html',
        controller: 'TeamsCtrl'
      });
  });
