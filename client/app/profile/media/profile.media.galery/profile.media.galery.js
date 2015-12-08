'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('profile.media-galery', {
                url: '/media-galery',
                templateUrl: 'app/profile/media/profile.media.galery/profile.media.galery.html',
                controller: 'ProfilePlayerGaleryCtrl'
            });
    });
