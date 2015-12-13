'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams.manageRoster', {
        url: '/manage-roster',
            views: {
                'pageTeam': {
                    templateUrl: 'app/manageRoster/manageRoster.html',
                    controller: 'ManageRosterCtrl'
                }
            }

        }).state('teams.manageRosterOld', {
            url: '/manage-roster-old',
            templateUrl: 'app/manageRoster/manageRoster_old.html',
            controller: 'ManageRosterCtrl'
        });
  });