'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.update-status.event', {
        url: '/event',
        templateUrl: 'app/home/home.update-status/home.update-status.event/home.update-status.event.jade',
      });
  });
