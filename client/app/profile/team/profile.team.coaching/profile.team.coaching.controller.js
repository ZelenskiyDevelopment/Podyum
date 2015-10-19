'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileTeamCoachingCtrl', function ($scope, sharedScope) {
    $scope.coaches = [];
    sharedScope.myCoaches.promise.then(function(coaches){
      $scope.coaches = coaches;
    });
  });
