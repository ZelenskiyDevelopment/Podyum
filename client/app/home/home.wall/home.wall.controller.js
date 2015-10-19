'use strict';

angular.module('abroadathletesApp')
  .controller('HomeWallCtrl', function ($scope, Event) {
    $scope.events = [];
    Event.getAllEvents().$promise.then(function(results){
      $scope.events = results;
    });

    $scope.refreshEventAfterModalDismiss = function(){
      Event.getAllEvents().$promise.then(function(results){
        $scope.events = results;
      });
    }
  });
