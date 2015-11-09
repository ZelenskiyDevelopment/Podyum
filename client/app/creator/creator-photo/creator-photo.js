'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('creator.photo', {
        url: '/photo',
        templateUrl: 'app/creator/creator-photo/creator-photo.html',
        controller: 'CreatorPhotoCtrl'
      });
  });
