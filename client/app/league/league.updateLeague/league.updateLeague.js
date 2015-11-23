'use strict';


angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('league.updateLeague', {
                url: '/update-league',
                templateUrl: 'app/league/league.updateLeague/league.updateLeague.html',
                controller: 'LeagueUpdateCtrl'
            });
    });
