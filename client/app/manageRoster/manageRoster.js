'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageRoster', {
        url: '/manageRoster',
        templateUrl: 'app/manageRoster/manageRoster.html',
        controller: 'ManageRosterCtrl'
      });
  });