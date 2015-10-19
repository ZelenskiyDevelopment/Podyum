'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recruiting', {
        url: '/recruiting',
        templateUrl: 'app/recruiting/recruiting.html',
        controller: 'RecruitingCtrl'
      });
  });
