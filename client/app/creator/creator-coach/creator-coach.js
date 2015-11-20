'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.coach', {
        url: '/coach',
        templateUrl: 'app/creator/creator-coach/creator-coach.html',
        controller:'CreatorCoachCtrl'
      });
  });
