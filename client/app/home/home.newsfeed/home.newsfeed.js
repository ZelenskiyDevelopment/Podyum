'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.newsfeed', {
        url: '/newsfeed',
        templateUrl: 'app/home/home.newsfeed/home.newsfeed.html',
        controller: 'HomeNewsFeedCtrl'
      });
  });
