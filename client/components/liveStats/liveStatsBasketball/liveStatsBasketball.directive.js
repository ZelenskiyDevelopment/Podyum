'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsBasketball', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsBasketball/liveStatsBasketball.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      controller: function($scope, $interval, $timeout, User, Game) {
        $scope.active1 = [];
        $scope.active2 = [];

        $scope.counter = 1200;

        $scope.benchSub1 = -1;
        $scope.activeSub1 = -1;
        $scope.benchSub2 = -1;
        $scope.activeSub2 = -1;

        $scope.action = -1;

        $scope.quart = 1;

        $scope.events = [];
        $scope.eventNames = ["FT Made", "FG Made", "3-point Made", "Off Rebound", "Assist", "Turnover", "FT Missed", "FG Missed", "3-point Missed", "Foul", "Def Rebound", "Steal","Block"];

        $scope.score1 = 0;
        $scope.score2 = 0;

        $timeout(function() {
          if(!$scope.game.data.T1) {
            $scope.game.data.T1 = new Array(13);
          }
          if(!$scope.game.data.T2) {
            $scope.game.data.T2 = new Array(13);
          }
          if(!$scope.game.data.score1) {
            $scope.game.data.score1 = 0;
          }
          if(!$scope.game.data.score2) {
            $scope.game.data.score2 = 0;
          }
          $scope.roster1Bool = new Array($scope.roster1.length);
          $scope.roster2Bool = new Array($scope.roster2.length);
          $scope.active1Bool = new Array(5);
          $scope.active2Bool = new Array(5);
          $scope.actionBool = new Array(13);
          for(var i = 0; i < 13; i++) {
            if(!$scope.game.data.T1[i]) {
              $scope.game.data.T1[i] = 0;
            }
            if(!$scope.game.data.T2[i]) {
              $scope.game.data.T2[i] = 0;
            }
            $scope.actionBool[i] = false;
          }
          if(!$scope.game.lastIn) {
            $scope.game.lastIn = {};
          }
          for(var i = 0; i < $scope.roster1.length;i++) {
            if(!$scope.game.lastIn[$scope.roster1[i]._id])
              $scope.game.lastIn[$scope.roster1[i]._id] = 0;
          }
          for(var i = 0; i < $scope.roster2.length;i++) {
            if(!$scope.game.lastIn[$scope.roster2[i]._id])
              $scope.game.lastIn[$scope.roster2[i]._id] = 0;
          }
          if(!$scope.game.userData) {
            $scope.game.userData = {};
            for (var i = 0; i < $scope.roster1.length; i++) {
              $scope.game.userData[$scope.roster1[i]._id] = new Array(14);
              for (var j = 0; j < 14; j++) {
                $scope.game.userData[$scope.roster1[i]._id][j] = 0;
              }
            }
            for (var i = 0; i < $scope.roster1.length; i++) {
              $scope.game.userData[$scope.roster2[i]._id] = new Array(14);
              for (var j = 0; j < 14; j++) {
                $scope.game.userData[$scope.roster2[i]._id][j] = 0;
              }
            }
          }
          for(var i = 0; i < $scope.roster1.length; i++) {
            $scope.roster1Bool[i] = false;
          }
          for(var i = 0; i < $scope.roster2.length; i++) {
            $scope.roster2Bool[i] = false;
          }
          for(var i = 0; i < 5; i++) {
            $scope.active1Bool[i] = false;
            $scope.active2Bool[i] = false;
          }
          Game.postLastIn({id:$scope.game._id, data:$scope.game.lastIn});
          Game.postUserData({id:$scope.game._id, data:$scope.game.userData});
          Game.postData({id:$scope.game._id, data:$scope.game.data})
        },2000);


        $scope.isRunning = false;

        var stop;
        $scope.startCount = function() {
          if($scope.active1.length === 5 && $scope.active2.length === 5) {
            if (angular.isDefined(stop)) {
              $scope.stopCount();
            }
            else {
              $scope.isRunning = true;
              stop = $interval(function () {
                if ($scope.counter > 0) {
                  $scope.counter = $scope.counter - 1;
                } else {
                  $scope.stopCount();
                  $scope.resetCount();
                }
              }, 1000);
            }
          }
          else {
            alert("Not enough players");
          }
        };

        $scope.stopCount = function() {
          if (angular.isDefined(stop)) {
            $scope.isRunning = false;
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.resetCount = function() {
          $scope.counter = 1200;
          if($scope.quart !== 4) {
            $scope.quart += 1;
          }
          else {
            $scope.game.data.finished = true;
          }
        };

        $scope.$on('$destroy', function() {
          $scope.stopCount();
        });

        $scope.fromBench = function(teamInd, ind) {
          if(teamInd === 1) {
            if($scope.activeSub2 !== -1) {
              $scope.active2Bool[$scope.activeSub2] = false;
              $scope.activeSub2 = -1;
            }
            if($scope.benchSub2 !== -1) {
              $scope.roster2Bool[$scope.benchSub2] = false;
              $scope.benchSub2 = -1;
            }
            if($scope.action !== -1) {
              $scope.actionBool[$scope.action] = false;
              $scope.action = -1;
            }
            if($scope.benchSub1 !== -1 && $scope.benchSub1 !== ind) {
              $scope.roster1Bool[$scope.benchSub1] = false;
              $scope.benchSub1 = -1;
            }
            if($scope.activeSub1 === -1) {
              if($scope.benchSub1 === ind) {
                $scope.roster1Bool[ind] = false;
                $scope.benchSub1 = -1;
              }
              else {
                $scope.benchSub1 = ind;
                $scope.roster1Bool[ind] = true;
              }
            }
            else {
              if(!_.contains($scope.active1, $scope.roster1[ind])) {
                substitute($scope.roster1[ind], $scope.active1[$scope.activeSub1]);
                $scope.active1[$scope.activeSub1] = $scope.roster1[ind];
                $scope.active1Bool[$scope.activeSub1] = false;
                $scope.activeSub1 = -1;
              }
              else {
                alert("Player already on field");
              }
            }
          }
          else {
            if($scope.activeSub1 !== -1) {
              $scope.active1Bool[$scope.activeSub1] = false;
              $scope.activeSub1 = -1;
            }
            if($scope.benchSub1 !== -1) {
              $scope.roster1Bool[$scope.benchSub1] = false;
              $scope.benchSub1 = -1;
            }
            if($scope.action !== -1) {
              $scope.actionBool[$scope.action] = false;
              $scope.action = -1;
            }
            if($scope.benchSub2 !== -1 && $scope.benchSub2 !== ind) {
              $scope.roster2Bool[$scope.benchSub2] = false;
              $scope.benchSub2 = -1;
            }
            if($scope.activeSub2 === -1) {
              if($scope.benchSub2 === ind) {
                $scope.roster2Bool[ind] = false;
                $scope.benchSub2 = -1;
              }
              else {
                $scope.benchSub2 = ind;
                $scope.roster2Bool[ind] = true;
              }
            }
            else {
              if(!_.contains($scope.active2, $scope.roster2[ind])) {
                substitute($scope.roster2[ind], $scope.active2[$scope.activeSub2]);
                $scope.active2[$scope.activeSub2] = $scope.roster2[ind];
                $scope.active2Bool[$scope.activeSub2] = false;
                $scope.activeSub2 = -1;
              }
              else {
                alert("Player already on field");
              }
            }
          }
        };

        var substitute = function(playerIn, playerOut) {
          var currentTime = angular.copy($scope.counter + 1200 * (4 - $scope.quart));
          if (playerIn) {
            $scope.game.lastIn[playerIn._id] = currentTime;
            console.log($scope.game.lastIn[playerIn._id])
          }
          if (playerOut) {
            $scope.game.userData[playerOut._id][13] += $scope.game.lastIn[playerOut._id] - currentTime;
            console.log($scope.game.userData[playerOut._id][13])
          }
          Game.postLastIn({id: $scope.game._id, data: $scope.game.lastIn});
          Game.postUserData({id: $scope.game._id, data: $scope.game.userData});
        };

        $scope.fromActive = function(teamInd, ind) {
          if(teamInd === 1) {
            if($scope.benchSub2 !== -1) {
              $scope.roster2Bool[$scope.benchSub2] = 0;
              $scope.benchSub2 = -1;
            }
            if($scope.activeSub2 !== -1) {
              $scope.active2Bool[$scope.activeSub2] = false;
              $scope.activeSub2 = -1;
            }
            if($scope.activeSub1 !== -1 && $scope.activeSub1 !== ind) {
              $scope.active1Bool[$scope.activeSub1] = false;
              $scope.activeSub1 = -1;
            }
            if($scope.benchSub1 === -1) {
              if($scope.action === -1) {
                if($scope.activeSub1 === ind) {
                  $scope.active1Bool[$scope.activeSub1] = false;
                  $scope.activeSub1 = -1;
                }
                else {
                  $scope.activeSub1 = ind;
                  $scope.active1Bool[ind] = true;
                }
              }
              else {
                makeEvent($scope.active1[ind], $scope.action, $scope.counter, $scope.quart, 1);
                $scope.actionBool[$scope.action] = false;
                $scope.action = -1;
              }
            }
            else {
              if(!_.contains($scope.active1, $scope.roster1[$scope.benchSub1])) {
                substitute($scope.roster1[$scope.benchSub1], $scope.active1[ind]);
                $scope.active1[ind] = $scope.roster1[$scope.benchSub1];
                $scope.roster1Bool[$scope.benchSub1] = false;
                $scope.benchSub1 = -1;
              }
              else {
                alert("Player already on field")
              }
            }
          }
          else {
            if($scope.benchSub1 !== -1) {
              $scope.roster1Bool[$scope.benchSub1] = 0;
              $scope.benchSub1 = -1;
            }
            if($scope.activeSub1 !== -1) {
              $scope.active1Bool[$scope.activeSub1] = false;
              $scope.activeSub1 = -1;
            }
            if($scope.activeSub2 !== -1 && $scope.activeSub2 !== ind) {
              $scope.active2Bool[$scope.activeSub2] = false;
              $scope.activeSub2 = -1;
            }
            if($scope.benchSub2 === -1) {
              if($scope.action === -1) {
                if($scope.activeSub2 === ind) {
                  $scope.active2Bool[$scope.activeSub2] = false;
                  $scope.activeSub2 = -1;
                }
                else {
                  $scope.activeSub2 = ind;
                  $scope.active2Bool[ind] = true;
                }
              }
              else {
                makeEvent($scope.active2[ind], $scope.action, $scope.counter, $scope.quart, 2);
                $scope.actionBool[$scope.action] = false;
                $scope.action = -1;
              }
            }
            else {
              if(!_.contains($scope.active2, $scope.roster2[$scope.benchSub2])) {
                substitute($scope.roster2[$scope.benchSub2], $scope.active2[ind]);
                $scope.active2[ind] = $scope.roster2[$scope.benchSub2];
                $scope.roster2Bool[$scope.benchSub2] = false;
                $scope.benchSub2 = -1;
              }
              else {
                alert("Player already on field")
              }
            }
          }

        };

        $scope.fromAction = function(ind) {
          if($scope.benchSub1 !== -1) {
            $scope.roster1Bool[$scope.benchSub1] = false;
            $scope.benchSub1 = -1;
          }
          if($scope.benchSub2 !== -1) {
            $scope.roster2Bool[$scope.benchSub2] = false;
            $scope.benchSub2 = -1;
          }
          if($scope.action !== -1 && $scope.action !== ind) {
            $scope.actionBool[$scope.action] = false;
            $scope.action = -1;
          }
          if($scope.activeSub1 !== -1) {
            makeEvent($scope.active1[$scope.activeSub1], ind, $scope.counter, $scope.quart, 1);
            $scope.active1Bool[$scope.activeSub1] = false;
            $scope.activeSub1 = -1;
          }
          else if($scope.activeSub2 !== -1) {
            makeEvent($scope.active2[$scope.activeSub2],ind, $scope.counter, $scope.quart, 2);
            $scope.active2Bool[$scope.activeSub2] = false;
            $scope.activeSub2 = -1;
          }
          else {
            if($scope.action === ind) {
              $scope.actionBool[$scope.action] = false;
              $scope.action = -1;
            }
            else {
              $scope.action = ind;
              $scope.actionBool[ind] = true;
            }
          }
        };
        var initResults = function() {
          $scope.game.data.T1 = new Array(13);
          $scope.game.data.T2 = new Array(13);
          for(var i = 0; i < 13; i++) {
            $scope.game.data.T1[i] = 0;
            $scope.game.data.T2[i] = 0;
          }
        };

        console.log($scope.game)

        var makeEvent = function(player, eventInd, time, quart, team) {
          if(player) {
            $scope.events.push({name: player, kind: $scope.eventNames[eventInd], time: time, quart: quart});
            if(player.player.stats) {
              player.player.stats[$scope.game.sport][eventInd]++;
              User.updateStats({id:player._id, stats:player.player.stats});
            }
            else {
              player.player.stats = {};
              player.player.stats[$scope.game.sport] = new Array(13);       // TYLKO LOKALNIE DLA BASKETBALL
              for(var i = 0; i < 13; i++) {
                player.player.stats[$scope.game.sport][i] = 0
              }
              player.player.stats[$scope.game.sport][eventInd]++;
              User.updateStats({id:player._id, stats:player.player.stats});
            }

            $scope.game.userData[player._id][eventInd]++;
            Game.postUserData({id: $scope.game._id, data: $scope.game.userData});

            if (team === 1) {
              $scope.game.data.T1[eventInd] = $scope.game.data.T1[eventInd] + 1;
              if (eventInd === 0) {
                $scope.score1 = $scope.score1 + 1;
                $scope.game.data.score1++;
              }
              else if (eventInd === 1) {
                $scope.score1 = $scope.score1 + 2;
                $scope.game.data.score1+=2;
              }
              else if (eventInd === 2) {
                $scope.score1 = $scope.score1 + 3;
                $scope.game.data.score1+=3;
              }
            }
            else {
              $scope.game.data.T2[eventInd] = $scope.game.data.T2[eventInd] + 1;
              if (eventInd === 0) {
                $scope.score2 = $scope.score2 + 1;
                $scope.game.data.score2++;
              }
              else if (eventInd === 1) {
                $scope.score2 = $scope.score2 + 2;
                $scope.game.data.score2+=2;
              }
              else if (eventInd === 2) {
                $scope.score2 = $scope.score2 + 3;
                $scope.game.data.score2+=3;
              }
            }
            if (eventInd === 9) {  // foul
              if (angular.isDefined(stop)) {
                $scope.stopCount();
              }
            }
            Game.postData({id:$scope.game._id, data:$scope.game.data})
          }
        }

        $scope.finishGame = function() {
          $scope.game.data.isFinished = true;
          if($scope.game.data.score1 > $scope.game.data.score2) {
            $scope.game.data.winner = 1
          }
          else {
            $scope.game.data.winner = 2;
          }
          Game.postData({id:$scope.game._id, data:$scope.game.data});
        }

      },
      link: function (scope, element, attrs) {
      }
    };
  });
