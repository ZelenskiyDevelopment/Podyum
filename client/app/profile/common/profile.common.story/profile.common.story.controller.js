'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileCommonStoryCtrl', function ($scope, Event) {
    $scope.events = [];
    Event.getOwnEvents().$promise.then(function (results) {
      $scope.wallEvents = results;
    });
  });
