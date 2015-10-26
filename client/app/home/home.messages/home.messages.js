'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.messages', {
        url: '/messages/:roomId/:threadId',
        templateUrl: 'app/home/home.messages/home.messages.html',
        controller: 'HomeMessagesCtrl'
      });
  });
