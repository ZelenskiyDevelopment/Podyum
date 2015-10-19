'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.team', {
        url: '/team',
        templateUrl: 'app/creator/creator-team/creator-team.html',
        controller: 'CreatorTeamCtrl'
      });
  });
