'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageStats', {
        url:'/manageStats',
        templateUrl: 'app/manageStats/manageStats.html',
        controller: 'ManageStatsCtrl'
      });
  });
