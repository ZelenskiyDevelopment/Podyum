'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('league.addLeague', {
                url: '/add-league',
                templateUrl: 'app/league/league.addLeague/league.addLeague.html',
                controller: 'AddLeagueCtrl'
            });
    });
