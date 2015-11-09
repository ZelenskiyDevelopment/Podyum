/**
 * Created by dev on 08.11.15.
 */

'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
       $stateProvider
           .state('teams.taskList', {
              url:'/task-manager/task-list',
              templateUrl: 'app/teams/teams.taskManager/listTasks/listTask.html',
              controller: 'ListTaskCtrl'
           });

    });
