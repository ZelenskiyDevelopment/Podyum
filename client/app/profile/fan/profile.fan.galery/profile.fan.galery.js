'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('profile.fan-galery', {
                url: '/fan-galery',
                templateUrl: 'app/profile/fan/profile.fan.galery/profile.fan.galery.html',
                controller: 'ProfilePlayerGaleryCtrl'
            });
    });
