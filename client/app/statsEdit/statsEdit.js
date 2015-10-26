'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('statsEdit', {
        url: '/statsEdit/:id/:isLive',
        templateUrl: 'app/statsEdit/statsEdit.html',
        controller: 'StatsEditCtrl'
      });
  });
