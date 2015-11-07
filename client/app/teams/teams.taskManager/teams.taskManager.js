'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teams.taskManager', {
                url: '/task-manager',
                templateUrl: 'app/teams/teams.taskManager/teams.taskManager.html',
                controller: 'TaskManager'
            });
    });
