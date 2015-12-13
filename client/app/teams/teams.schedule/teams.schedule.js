'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teams.schedule', {
                url: '/schedule',
                views: {
                    'pageTeam': {
                        templateUrl: 'app/teams/teams.schedule/teams.schedule.html',
                        controller: 'ScheduleCtrl'
                    }
                }


            });
    });
