'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:pattern',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
