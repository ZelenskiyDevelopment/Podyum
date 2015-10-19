'use strict';

angular.module('abroadathletesApp')
  .controller('HomeNewsfeedCtrl', function ($scope, Event) {
    $scope.events = [];
    Event.getOwnEvents().$promise.then(function(results){
      $scope.events = results;
    });
  });
