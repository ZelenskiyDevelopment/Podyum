'use strict';

angular.module('abroadathletesApp')
  .controller('ManageStatsCtrl', function ($scope, User,NewGameModal, Game, socket) {
    User.get().$promise.then(function (me) {
      $scope.user = me;
      $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
        return assignedUser.user.kind === 'player' && assignedUser.isPresent;
      });

      $scope.myCoaches = $scope.user.assigned.filter(function (assignedUser) {
        return assignedUser.user.kind === 'coach' && assignedUser.isPresent;
      });

      $scope.myFollowers = $scope.user.followed.filter(function(follower) {
        return follower.kind==='player' || follower.kind==='coach' || follower.kind==='fan';
      });

      if(me.kind ==="team" || me.kind ==="league") {
        Game.getGames({id: me._id}).$promise.then(function (games) {
          $scope.games = games;
        });
      }

      if(me.managesStats.length > 0) {
        User.getUserManagesStats({id: me._id}).$promise.then(function(user) {
          $scope.myManagedStats = user.managesStats;
        });
      }

      if(me.kind ==="team") {
        User.getUserStatsAdmins({id: me._id}).$promise.then(function (user) {
          $scope.myStatsAdmins = user.statsAdmins;
        });
      }

    });

    $scope.revokeStatsAdmin = function(ID, ind) {
      var data= {id:ID};
      $scope.myStatsAdmins.splice(ind,1)
      User.revokeStatsAdmin({data: data});
    };

    $scope.chooseTeamToManage = function(ind) {
      $scope.chosenTeam = ind;
      Game.getGames({id:$scope.user.managesStats[ind]}).$promise.then(function (games) {
        $scope.games = games;
        console.log(games);
      });
    };

    $scope.newGame = function () {
      NewGameModal.newGame.open()(function (game) {
        game.sport = $scope.user.sport;
        console.log(game)

        Game.create(game).$promise.then(function (result) {
          console.log(result)
        })
        Game.getGames({id: $scope.user._id}).$promise.then(function (games) {
          $scope.games = games;
        });
      });
    };

  });
