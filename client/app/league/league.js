'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('league', {
                url: '/league',
                templateUrl: 'app/league/league.html',
                controller: 'LeagueCtrl'
            });
    });
