'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.update-status', {
                url: '',
                templateUrl: 'app/home/home.update-status/home.update-status.jade',
            });
    });
