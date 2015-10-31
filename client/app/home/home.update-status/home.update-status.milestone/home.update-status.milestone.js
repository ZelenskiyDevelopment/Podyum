'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.update-status.milestone', {
                url: '/milestone',
                templateUrl: 'app/home/home.update-status/home.update-status.milestone/home.update-status.milestone.html',
            });
    });
