'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageStats', {
        url:'/manage-stats',
        templateUrl: 'app/manageStats/manageStats.html',
        controller: 'ManageStatsCtrl'
      });
  });
