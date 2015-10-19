'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        templateUrl: 'app/jobs/jobs.html',
        controller: 'JobsCtrl'
      });
  });
