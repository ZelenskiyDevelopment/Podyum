'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        resolve: {
          sharedScope: function () {
            return {};
          }
        },
        url: '/profile/:id',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        abstract: true
      });
  });
