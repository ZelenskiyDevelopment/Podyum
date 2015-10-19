'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.wall', {
        url: '',
        templateUrl: 'app/home/home.wall/home.wall.html',
        controller: 'HomeWallCtrl'
      });
  });
