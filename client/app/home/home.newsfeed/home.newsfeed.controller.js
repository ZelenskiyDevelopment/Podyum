'use strict';

/**
 * @ngdoc object
 * @name abroadathletesApp.controller:HomeNewsFeedCtrl
 * @requires  $scope
 * @description
 * Home News Feed controller
 */

angular.module('abroadathletesApp')
  .controller('HomeNewsFeedCtrl', function ($scope, Event) {
    $scope.events = [];
    Event.getOwnEvents().$promise.then(function(results){
      $scope.events = results;
    });
  });
