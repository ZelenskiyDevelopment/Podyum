'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageSubscription',{
        url:'/manageSubscription',
        templateUrl:'app/manageSubscription/manageSubscription.html',
        controller:'manageSubscriptionCtrl'
      });
    });