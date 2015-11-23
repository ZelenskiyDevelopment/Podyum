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
            .state('league.taskView', {
                url:'/task-manager/task-list/league/:taskId',
                views: {
                    "viewTask": {
                        templateUrl: 'app/league/league.taskManager/listTasks/taskView/taskView.html',
                        controller: 'TaskLeagueViewCtrl'
                    }
                }
            });


    });
