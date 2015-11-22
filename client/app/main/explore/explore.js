'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('explore', {
        url: '/explore',
        templateUrl: 'app/main/explore/explore.html',
        controller: 'ExploreCtrl'
      });
  });