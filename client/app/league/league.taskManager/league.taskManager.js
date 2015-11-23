'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('league.taskManager', {
                url: '/task-manager',
                templateUrl: 'app/league/league.taskManager/league.taskManager.html',
                controller: 'TaskManagerLeague'
            });
    });
