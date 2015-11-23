'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.fan-bio', {
        url: '/fan-bio',
        templateUrl: 'app/profile/fan/profile.fan.bio/profile.fan.bio.html',
      });
  });
