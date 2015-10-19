'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileTeamRosterCtrl', function ($scope, sharedScope, User) {
    $scope.players = [];
    sharedScope.myPlayers.promise.then(function(players){
      $scope.players = players;
    });
  });
