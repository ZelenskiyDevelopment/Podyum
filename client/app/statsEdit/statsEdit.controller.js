'use strict';

angular.module('abroadathletesApp')
  .controller('StatsEditCtrl', function ($scope, $stateParams, Game, User) {
    $scope.thisGame = {};
    $scope.roster1 = [];
    $scope.roster2 = [];
    $scope.isLive = $stateParams.isLive;
    Game.get({id: $stateParams.id}).$promise.then(function (me) {
      $scope.thisGame = me;
      User.getUserByTeam({id: $scope.thisGame.team1._id}).$promise.then(function (user) {

        $scope.roster1 = [];
        for (var i = 0; i < user.assigned.length; i++) {
          if(user.assigned[i].isPresent) {
            var member = user.assigned[i].user;
            if (member.kind === "player")
              $scope.roster1.push(member);
          }
        }
      });
      User.getUserByTeam({id: $scope.thisGame.team2._id}).$promise.then(function (user) {

        $scope.roster2 = [];
        for (var i = 0; i < user.assigned.length; i++) {
          if(user.assigned[i].isPresent) {
            var member = user.assigned[i].user;
            if (member.kind === "player")
              $scope.roster2.push(member);
          }
        }
      });
    });
  });
