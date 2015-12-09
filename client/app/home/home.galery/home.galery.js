'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.galery', {
        url: '/home-galery',
        templateUrl: 'app/home/home.galery/home.galery.html',
        controller: 'ProfilePlayerGalleryCtrl'
      });
  });
