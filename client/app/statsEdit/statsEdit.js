'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
       .state('manageStats.statsEdit', {
        url: '/stats-edit/:id/:isLive',
        templateUrl: 'app/statsEdit/statsEdit.html',
        controller: 'StatsEditCtrl'
      });
  });
