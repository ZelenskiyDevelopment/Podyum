'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.update-status', {
                url: '/update-fans',
                templateUrl: 'app/home/home.update-status/home.update-status.html',
                controller: 'ProfilePlayerStatsCtrl'
            });
    });
