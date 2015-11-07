'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams.manageRoster', {
        url: '/manage-roster',
        templateUrl: 'app/manageRoster/manageRoster.html',
        controller: 'ManageRosterCtrl'
      });
  });