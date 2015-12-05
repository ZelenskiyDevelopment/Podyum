'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileCommonStoryCtrl', function ($scope, Event, $rootScope,$stateParams) {
    $scope.events = [];

     if ($stateParams.id) {
         Event.getOwnEventsById({id:$stateParams.id}).$promise.then(function (results) {
             $scope.wallEvents = results;
         });
     } else {
         Event.getOwnEvents().$promise.then(function (results) {
             $scope.wallEvents = results;
         });
     }

  });
