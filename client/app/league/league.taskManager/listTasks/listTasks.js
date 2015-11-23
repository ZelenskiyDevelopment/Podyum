/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
       $stateProvider
           .state('league.taskList', {
              url:'/task-manager/task-list',
              templateUrl: 'app/league/league.taskManager/listTasks/listTask.html',
              controller: 'ListTaskCtrlLeague'
           });

    });
