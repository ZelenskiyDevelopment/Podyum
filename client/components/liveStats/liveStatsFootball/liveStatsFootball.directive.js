'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsFootball', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/liveStatsFootball.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      controller: function ($scope, $interval, $timeout, $filter, User, Game, GameMessage, notify) {
        $scope.active1 = [];
        $scope.active2 = [];

        $scope.$watch(
          // This function returns the value being watched. It is called for each turn of the $digest loop
          $scope.ballon,
          // This is the change listener, called when the value returned from the above function changes
          function (newValue, oldValue) {
            if (newValue !== oldValue) {
              // Only increment the counter if the value changed
              $scope.ballon = newValue;
            }
          }
        );

        $scope.team = 0;

        $scope.offense = 0;

        $scope.status = {timeouts: {0: 3, 1: 3}, ballon: 40, down: 1, togo: 10, offense: 0, quart: 1};

        $scope.ballon = 40;
        $scope.down = 1;
        $scope.togo = 10;

        $scope.counter = 900;
        $scope.counterText = '15:00';

        $scope.changingTimer = 0;

        $scope.benchSub1 = -1;
        $scope.activeSub1 = -1;
        $scope.benchSub2 = -1;
        $scope.activeSub2 = -1;

        $scope.action = -1;

        $scope.quart = 1;

        $scope.events = [];
        $scope.plays = ["Run", "Pass", "Special Teams", "Penalty"];
        $scope.score1 = 0;
        $scope.score2 = 0;

        $scope.playtype = -1;

        $scope.topPlayers = {
          0:{},
          1:{}
        };

        $scope.topPlayersPlay = {};


        $scope.setTimeouts = function (team, timeouts) {
          if(timeouts === undefined && $scope.status.timeouts[team] <=3 ) {
            timeouts = $scope.status.timeouts[team] + 1;
          } else {
            if ($scope.status.timeouts[team] > 0) {
              timeouts = $scope.status.timeouts[team] - 1;
            }
          }
          $scope.status.timeouts[team] = timeouts;
        };

        $scope.getQuarterString = function () {
          var qtrString = '';
          switch ($scope.status.quart) {
            case 1:
              qtrString = 'End 1st Qtr';
              break;
            case 2:
              qtrString = 'End 2nd Qtr';
              break;
            case 3:
              qtrString = 'End 3rd Qtr';
              break;
            case 4:
              qtrString = 'End Game';
              break;
            default:
              qtrString = 'Game ended';
          }
          return qtrString;
        };

        $scope.sortPlayers = function(players){
          players.sort(function(a, b){
            return a.count - b.count;
          });
          return players;
        };

        $scope.getTopPlayers = function() {
          var players = [];
          var playtype = $scope.playtype;
          var currentTeam = $scope.status.offense;

          if($scope.topPlayers[currentTeam] != undefined && $scope.topPlayers[currentTeam][playtype] != undefined ) {
            var keys = Object.keys($scope.topPlayers[currentTeam][playtype]);
            for (var i = 0; i < keys.length; ++i) {
              players.push({number: (+keys[i]), count: $scope.topPlayers[currentTeam][playtype][keys[i]]});
            }
            $scope.sortPlayers(players);
            players.reverse();
          }

          var roster = currentTeam == 0 ? $scope.roster1 : $scope.roster2;

          players.forEach(function(player, key){
            roster.forEach(function(rosterPlayer){
              if((+rosterPlayer.player.number) == player.number){
                players[key].name = rosterPlayer.player.lastName;
              }
            });
          });

          return players;
        };

        $scope.EndQuarter = function () {
          if ($scope.status.quart < 5) {
            $scope.status.quart = $scope.status.quart + 1;
          } else {
            $scope.game.data.finished = true;
          }
        };

        $scope.manuallyChangeTimer = function () {

          var p = $scope.counterText.split(':');
          $scope.counter = (+p[0]) * 60 + (+p[1]);

          $scope.changingTimer = 0;
        };


        $scope.choosePlayType = function (ind) {
          if (ind == 0) {
            $scope.events = [{
              team: $scope.status.offense,
              type: "run",
              data: {
                team: $scope.status.offense + 1,
                player: $scope.selectedPlayer
              }
            }];
          }
          if (ind == 1) {
            $scope.events = [{
              team: $scope.status.offense,
              type: "pass",
              data: {
                team: $scope.status.offense + 1,
                player: $scope.selectedPlayer
              }
            }];
          }
          if (ind == 2) {
            $scope.events = [];
          }
          $scope.playtype = ind;
          $scope.topPlayersPlay = $scope.getTopPlayers();
        };

        $scope.swapPossession = function () {
          $scope.status.offense = $scope.status.offense == 1 ? 0 : 1;
        };

        $scope.playbyplay = [];

        $scope.teamScore = function (team) {

          if (team === 1) {

          } else {

          }
        };


        var makeStats = function(player, eventInd, count) {

          console.log(player, eventInd, count);

          //**** Player stats ****
          if (count == undefined) {
            count = 0;
          }
          if(player.player.stats) {
            if(player.player.stats[$scope.game.sport][eventInd] == undefined) {
              player.player.stats[$scope.game.sport][eventInd] = 0;
            }
            player.player.stats[$scope.game.sport][eventInd] = player.player.stats[$scope.game.sport][eventInd] + count;
            User.updateStats({id:player._id, stats:player.player.stats});
          }
          else {
            player.player.stats = {};
            player.player.stats[$scope.game.sport] = {};
            eval("player.player.stats[$scope.game.sport]." + eventInd + " = count");
            User.updateStats({id:player._id, stats:player.player.stats});
          }
        };

        var getUserByPlayerNumber = function (team, num) {
          var roster = team == 0 ? $scope.roster1 : $scope.roster2;
          var player = {};

          roster.forEach(function(el){
            if(el.player.number == num){
              player = el;
            }
          });
          return player;
        };

        var updateEventsWithTime = function() {
          angular.forEach($scope.events, function(el){
            el.createdAt = $scope.counterText;
          });
        };

        $scope.submit = function () {
          // update BALLON
          // UPDATE TOGO
          // UPDATE DOWN
          // UPDATE SCORE
          updateEventsWithTime();
          $scope.playbyplay.push($scope.events);


          if($scope.topPlayers[$scope.status.offense] == undefined){
            $scope.topPlayers[$scope.status.offense] = {};
          }

          if($scope.topPlayers[$scope.status.offense][$scope.playtype] == undefined) {
            $scope.topPlayers[$scope.status.offense][$scope.playtype] = {};

          }
          if($scope.topPlayers[$scope.status.offense][$scope.playtype][$scope.events[0].data.player] == undefined) {
            $scope.topPlayers[$scope.status.offense][$scope.playtype][$scope.events[0].data.player] = 0;
          }

          $scope.topPlayers[$scope.status.offense][$scope.playtype][$scope.events[0].data.player] = $scope.topPlayers[$scope.status.offense][$scope.playtype][$scope.events[0].data.player] + 1;

          angular.forEach($scope.events, function (value) {

            //GAMEPLAY!!!

            var count = 1;

            switch (value.type) {
              case "touchdown" :
                    count = 1;
                    break;
              case "run" :
                    count = value.data.gain == null ? 0 : value.data.gain;
                    break;
              case "tackle" :
                    count = 1;
                    break;
            }

            var playerId = value.data.player ? value.data.player : value.data.tackler;

            makeStats(getUserByPlayerNumber(value.team, playerId), value.type, count);

            if ($filter('footballDescription')(value).length > 0) {
              notify({message: $filter('footballDescription')(value), classes: 'alert-success', position: 'right'});
            }





            GameMessage.AddMessage({
              message: $filter('footballDescription')(value),
              id_game: $scope.game._id
            }).$promise.then(function () {
                console.log('yes');
              });


          });


          if ($scope.events[$scope.events.length - 1].type === "touchdown") {
            $scope.status.offense = $scope.status.offense == 0 ? 1 : 0;
            if ($scope.events[$scope.events.length - 1].team === 0) {
              $scope.game.data.score1 += 6;
            }
            else {
              $scope.game.data.score2 += 6;
            }
            $scope.down = 1;
            $scope.togo = 10;
          }
          else {
            if ($scope.status.down < 4) {
              $scope.status.down++;
            } else {
              $scope.status.down = 1;
              $scope.status.offense = $scope.status.offense == 0 ? 1 : 0;
            }
            if ($scope.togo == 0) {
              $scope.down = 1;
              $scope.togo = 10;
            }
          }
          $scope.reset();
        };

        $scope.reset = function () {
          $scope.playtype = -1;
          $scope.events = [];
          $scope.choosePlayType(-1);
        };


        $scope.TimeOut = function () {
          if ($scope.status.timeouts[$scope.status.offense] == 0) { //If no timouts do nothing
            return;
          }
          $scope.status.timeouts[$scope.status.offense] = $scope.status.timeouts[$scope.status.offense] - 1;
        };

        $timeout(function () {
          if (!$scope.game.data.T1) {
            $scope.game.data.T1 = new Array(13);
          }
          if (!$scope.game.data.T2) {
            $scope.game.data.T2 = new Array(13);
          }
          if (!$scope.game.data.score1) {
            $scope.game.data.score1 = 0;
          }
          if (!$scope.game.data.score2) {
            $scope.game.data.score2 = 0;
          }
          $scope.roster1Bool = new Array($scope.roster1.length);
          $scope.roster2Bool = new Array($scope.roster2.length);
          $scope.active1Bool = new Array(5);
          $scope.active2Bool = new Array(5);
          $scope.actionBool = new Array(13);
          for (var i = 0; i < 13; i++) {
            if (!$scope.game.data.T1[i]) {
              $scope.game.data.T1[i] = 0;
            }
            if (!$scope.game.data.T2[i]) {
              $scope.game.data.T2[i] = 0;
            }
            $scope.actionBool[i] = false;
          }
          if (!$scope.game.lastIn) {
            $scope.game.lastIn = {};
          }
          for (var i = 0; i < $scope.roster1.length; i++) {
            if (!$scope.game.lastIn[$scope.roster1[i]._id])
              $scope.game.lastIn[$scope.roster1[i]._id] = 0;
          }
          for (var i = 0; i < $scope.roster2.length; i++) {
            if (!$scope.game.lastIn[$scope.roster2[i]._id])
              $scope.game.lastIn[$scope.roster2[i]._id] = 0;
          }
          if (!$scope.game.userData) {
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
          for (var i = 0; i < $scope.roster1.length; i++) {
            $scope.roster1Bool[i] = false;
          }
          for (var i = 0; i < $scope.roster2.length; i++) {
            $scope.roster2Bool[i] = false;
          }
          for (var i = 0; i < 5; i++) {
            $scope.active1Bool[i] = false;
            $scope.active2Bool[i] = false;
          }
          Game.postLastIn({id: $scope.game._id, data: $scope.game.lastIn});
          Game.postUserData({id: $scope.game._id, data: $scope.game.userData});
          Game.postData({id: $scope.game._id, data: $scope.game.data})
        }, 2000);


        $scope.isRunning = false;
        Object.size = function (obj) {
          var size = 0, key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        var stop;
        $scope.startCount = function () {

          console.log(Object.size($scope.active1));
          console.log(Object.size($scope.active2));
          // if(Object.size($scope.active1) === 5 && Object.size($scope.active2) === 5) {
          if (angular.isDefined(stop)) {
            $scope.stopCount();
          }
          else {
            $scope.isRunning = true;
            stop = $interval(function () {
              if ($scope.counter > 0) {
                $scope.counter = $scope.counter - 1;
                $scope.counterText = $filter('timerDisplay')($scope.counter);
              } else {
                $scope.stopCount();
                $scope.resetCount();
              }
            }, 1000);
          }
//          }
//          else {
//            alert("Not enough players");
//          }
        };

        $scope.stopCount = function () {
          if (angular.isDefined(stop)) {
            $scope.isRunning = false;
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.fromBench = function (teamInd, ind) {

          if (teamInd === 1) {
            substitute($scope.roster1[ind], $scope.active1[$scope.activeSub1]);
            $scope.active1[$scope.roster1[ind]._id] = $scope.roster1[ind];
            $scope.active1Bool[$scope.roster1[ind]._id] = false;
            $scope.activeSub1 = -1;
            console.log($scope.active1);
            $scope.selectedPlayer = $scope.roster1[ind].player.number;
            $scope.status.offense = 0;
          }
          else {
            substitute($scope.roster2[ind], $scope.active2[$scope.activeSub2]);
            $scope.active2[$scope.roster2[ind]._id] = $scope.roster2[ind];
            $scope.active2Bool[$scope.roster2[ind]._id] = false;
            $scope.activeSub2 = -1;
            console.log($scope.active2);
            $scope.selectedPlayer = $scope.roster2[ind].player.number;
            $scope.status.offense = 1;
          }

          $scope.choosePlayType($scope.playtype);
        };

        $scope.show_team = function () {
          console.log($filter('timerDisplay')($scope.counter));
        };

        var substitute = function (playerIn, playerOut) {
          var currentTime = angular.copy($scope.counter + 900 * (4 - $scope.quart));
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
        $scope.resetCount = function () {
          $scope.counter = 900;
          if ($scope.status.quart !== 4) {
            $scope.status.quart += 1;
          }
          else {
            $scope.game.data.finished = true;
          }
        };

        $scope.$on('$destroy', function () {
          $scope.stopCount();
        });


      },
      link: function (scope, element, attrs) {
      }
    };
  });
