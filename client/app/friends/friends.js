'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends/:id',
        templateUrl: 'app/friends/friends.html',
        controller: 'FriendsCtrl'
      });
  });
