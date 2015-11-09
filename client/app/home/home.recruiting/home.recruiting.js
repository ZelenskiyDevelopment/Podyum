'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.recruiting', {
        url: '/home-recruiting',
        templateUrl: 'app/home/home.recruiting/home.recruiting.html',
        controller: 'ProfileTeamRecruitingCtrl'
      });
  });
