'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('personalGoals', {
        url:'/personalGoals',
        templateUrl: 'app/personalGoals/personalGoals.html',
        // controller: 'ManageStatsCtrl'
      });
  });