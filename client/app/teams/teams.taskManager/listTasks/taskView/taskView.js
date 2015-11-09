/**
 * Created by dev on 08.11.15.
 */

/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teams.taskView', {
                url:'/task-manager/task-list/task/:taskId',
                views: {
                    "viewTask": {
                        templateUrl: 'app/teams/teams.taskManager/listTasks/taskView/taskView.html',
                        controller: 'TaskViewCtrl'
                    }
                }
            });


    });
