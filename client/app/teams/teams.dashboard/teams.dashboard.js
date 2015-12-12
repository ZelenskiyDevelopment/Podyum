'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teams.dashBoard', {
                url: '/dashboard',
                templateUrl: 'app/teams/teams.dashboard/teams.dashboard.html',
                controller:'DashBoardCtrl'
            });
    });
