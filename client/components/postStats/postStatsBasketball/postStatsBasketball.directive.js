'use strict';

angular.module('abroadathletesApp')
  .directive('postStatsBasketball', function () {
    return {
      templateUrl: 'components/postStats/postStatsBasketball/postStatsBasketball.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      controller: function($scope, $interval, $timeout, User, Game) {
        var oldUserData;
        var statLen;
        $timeout(function() {
          statLen = 14;
          $scope.eventNames = ["FT Made", "FG Made", "3-point Made", "Off Rebound", "Assist", "Turnover", "FT Missed", "FG Missed", "3-point Missed", "Foul", "Def Rebound", "Steal","Block","Minutes played"];

          if(!$scope.game.data.T1) {
            $scope.game.data.T1 = new Array(statLen);
          }
          for(var i = 0; i < statLen; i++) {
            if(!$scope.game.data.T1[i])
              $scope.game.data.T1[i] = 0;
          }
          if(!$scope.game.data.T2) {
            $scope.game.data.T2 = new Array(statLen);
          }
          for(var i = 0; i < statLen; i++) {
            if(!$scope.game.data.T2[i])
              $scope.game.data.T2[i] = 0;
          }
          if(!$scope.game.data.score1) {
            $scope.game.data.score1 = 0;
          }
          if(!$scope.game.data.score2) {
            $scope.game.data.score2 = 0;
          }
          if($scope.game.userData) {
            oldUserData = angular.copy($scope.game.userData);

          }
          $scope.roster1Bool = new Array($scope.roster1.length);
          $scope.roster2Bool = new Array($scope.roster2.length);

          for(var i = 0; i < $scope.roster1.length; i++) {
            $scope.roster1Bool[i] = false;
          }
          for(var i = 0; i < $scope.roster2.length; i++) {
            $scope.roster2Bool[i] = false;
          }
          Game.postData({id:$scope.game._id, data:$scope.game.data})
        },500);


        $scope.currentPlayerStats = new Array(statLen);

        $scope.fromBench = function(teamInd, ind) {
          if($scope.currentTeam === 1) {
            $scope.roster1Bool[$scope.currentInd] = false;
          }
          if($scope.currentTeam === 2) {
            $scope.roster2Bool[$scope.currentInd] = false;
          }
          if(teamInd === 1) {
            $scope.currentPlayer = $scope.roster1[ind];
            $scope.currentTeam = 1;
            $scope.currentInd = ind;
            $scope.roster1Bool[ind] = true;
          }
          if(teamInd === 2) {
            $scope.currentPlayer = $scope.roster2[ind];
            $scope.currentTeam = 2;
            $scope.currentInd = ind;
            $scope.roster2Bool[ind] = true;
          }
          if(!$scope.game.userData) {
            $scope.game.userData = {};
            for(var i = 0; i < $scope.roster1.length; i++) {
              $scope.game.userData[$scope.roster1[i]._id] = new Array(14);
              for(var j = 0; j < statLen; j++) {
                $scope.game.userData[$scope.roster1[i]._id][j] = 0;
              }
            }
            for(var i = 0; i < $scope.roster2.length; i++) {
              $scope.game.userData[$scope.roster2[i]._id] = new Array(14);
              for(var j = 0; j < statLen; j++) {
                $scope.game.userData[$scope.roster2[i]._id][j] = 0;
              }
            }
          }
        };

        $scope.finishGame = function() {
          $scope.game.data.isFinished = true;
          if($scope.game.data.score1 > $scope.game.data.score2) {
            $scope.game.data.winner = 1
          }
          else {
            $scope.game.data.winner = 2;
          }
          Game.postData({id:$scope.game._id, data:$scope.game.data});
        };

        $scope.check = function() {
          $scope.isCorrect = true;
          for(var i = 0; i < $scope.roster1.length; i++) {
            for(var j = 0; j < statLen; j++) {
              if(!isFinite($scope.game.userData[$scope.roster1[i]._id][j])) {
                $scope.isCorrect = false;
              }
            }
          }
          for(var i = 0; i < $scope.roster2.length; i++) {
            for(var j = 0; j < statLen; j++) {
              if(!isFinite($scope.game.userData[$scope.roster2[i]._id][j])) {
                $scope.isCorrect = false;
              }
            }
          }
          if($scope.isCorrect) {
            for (var i = 0; i < statLen; i++) {
              $scope.game.data.T1[i] = 0;
              $scope.game.data.T2[i] = 0;
            }
            for (var i = 0; i < $scope.roster1.length; i++) {
              for (var j = 0; j < statLen; j++) {
                $scope.game.data.T1[j] += $scope.game.userData[$scope.roster1[i]._id][j];
              }
            }
            for (var i = 0; i < $scope.roster2.length; i++) {
              for (var j = 0; j < statLen; j++) {
                $scope.game.data.T2[j] += $scope.game.userData[$scope.roster2[i]._id][j];
              }
            }
            $scope.game.data.score1 = $scope.game.data.T1[0] + 2 * $scope.game.data.T1[1] + 3 * $scope.game.data.T1[2];
            $scope.game.data.score2 = $scope.game.data.T2[0] + 2 * $scope.game.data.T2[1] + 3 * $scope.game.data.T2[2];
          }
        }

        $scope.save = function() {
          $scope.check();
          for (var i = 0; i < $scope.roster1.length; i++) {
            var player = $scope.roster1[i];
            if (player.player.stats) {
              for (var j = 0; j < statLen; j++) {
                if(oldUserData) {
                  player.player.stats[$scope.game.sport][j] -= oldUserData[$scope.roster1[i]._id][j];
                }
                player.player.stats[$scope.game.sport][j] += $scope.game.userData[$scope.roster1[i]._id][j];
              }
            }
            else {
              player.player.stats = {};
              player.player.stats[$scope.game.sport] = new Array(statLen);
              for (var j = 0; j < statLen; j++) {
                player.player.stats[$scope.game.sport][j] = $scope.game.userData[$scope.roster1[i]._id][j]
              }
            }
            User.updateStats({id: player._id, stats: player.player.stats});
          }
          for (var i = 0; i < $scope.roster2.length; i++) {
            var player = $scope.roster2[i];
            if (player.player.stats) {
              for (var j = 0; j < statLen; j++) {
                if(oldUserData) {
                  player.player.stats[$scope.game.sport][j] -= oldUserData[$scope.roster2[i]._id][j];
                }
                player.player.stats[$scope.game.sport][j] += $scope.game.userData[$scope.roster2[i]._id][j]
              }
            }
            else {
              player.player.stats = {};
              player.player.stats[$scope.game.sport] = new Array(statLen);
              for (var j = 0; j < statLen; j++) {
                player.player.stats[$scope.game.sport][j] = $scope.game.userData[$scope.roster2[i]._id][j]
              }
            }
            User.updateStats({id: player._id, stats: player.player.stats});
          }
          oldUserData = angular.copy($scope.game.userData);
          Game.postUserData({id: $scope.game._id, data: $scope.game.userData});
          console.log($scope.game.data)
          Game.postData({id:$scope.game._id, data:$scope.game.data});
        }

      },
      link: function (scope, element, attrs) {
      }
    };
  });
