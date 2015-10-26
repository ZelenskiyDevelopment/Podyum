'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileTeamStatsCtrl', function ($scope, sharedScope, $q) {
    var getTopPlayers = function (propertyInd, n, players) {
      var sortedArray = _.sortBy(players, function (player) {
        if (player.user.player.stats) {
          if (player.user.player.stats['basketball']) {
            if (propertyInd === -1) { // score
              return player.user.player.stats['basketball'][0] + 2 * player.user.player.stats['basketball'][1] + 3 * player.user.player.stats['basketball'][2]
            } else if (propertyInd === -2) {    //rebounds
              return player.user.player.stats['basketball'][3] + player.user.player.stats['basketball'][10];
            } else if (propertyInd === 1) {       // FG
              return player.user.player.stats['basketball'][1]+player.user.player.stats['basketball'][2]
            }
              else {
              return player.user.player.stats['basketball'][propertyInd];
            }
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      });
      sortedArray = sortedArray.reverse();
      return _.slice(sortedArray, 0, n);
    };
    var getTopValues = function (array, propertyInd, n) {
      var result = new Array(n);
      for (var i = 0; i < 3; i++) {
        if (array[i].user.player.stats) {
          if (array[i].user.player.stats['basketball']) {
            if (propertyInd === -1) {     // score
              result[i] = array[i].user.player.stats['basketball'][0] + 2 * array[i].user.player.stats['basketball'][1] + 3 * array[i].user.player.stats['basketball'][2];
            } else if (propertyInd === -2) {    // rebound
              result[i] = array[i].user.player.stats['basketball'][3] + array[i].user.player.stats['basketball'][10];
            } else if (propertyInd === 1) {       // FG
              result[i] =  array[i].user.player.stats['basketball'][1] + array[i].user.player.stats['basketball'][2];
            }
            else {
              result[i] = array[i].user.player.stats['basketball'][propertyInd];
            }
          } else {
            result[i] = 0;
          }
        } else {
          result[i] = 0;
        }
      }
      return result;
    };

    $q.all([sharedScope.games.promise, sharedScope.myPlayers.promise]).then(function(result){
      var games = _.first(result),
        players = _.last(result);

      _.remove(games, function(game) {
        return !game.data.score1;
      });
      $scope.games = games;
      if ($scope.user.kind === "team") {
        $scope.myGameStats = new Array($scope.games.length);
        if ($scope.owner.kind === "team") {
          for (var i = 0; i < $scope.games.length; i++) {
              if ($scope.games[i].team1._id === $scope.owner._id && $scope.games[i].data.T1) {
                $scope.myGameStats[i] = $scope.games[i].data.T1;
              }
              if ($scope.games[i].team2._id === $scope.owner._id && $scope.games[i].data.T2) {
                $scope.myGameStats[i] = $scope.games[i].data.T2;
              }
          }
          $scope.myStats = _.fill(Array(13), 0);

          for (var i = 0; i < $scope.myGameStats.length; i++) {
              for (var j = 0; j < 13; j++) {
                $scope.myStats[j] += $scope.myGameStats[i][j];
              }
          }
        }
      }

      $scope.scoreTopPlayers = getTopPlayers(-1, 3, players);
      $scope.scoreTops = getTopValues($scope.scoreTopPlayers, -1, 3);

      $scope.ftTopPlayers = getTopPlayers(0, 3, players);
      $scope.ftTops = getTopValues($scope.ftTopPlayers, 0, 3);

      $scope.fgTopPlayers = getTopPlayers(1, 3, players);
      $scope.fgTops = getTopValues($scope.fgTopPlayers, 1, 3);

      $scope.tpTopPlayers = getTopPlayers(2, 3, players);
      $scope.tpTops = getTopValues($scope.tpTopPlayers, 2, 3);

      $scope.asTopPlayers = getTopPlayers(4, 3, players);
      $scope.asTops = getTopValues($scope.asTopPlayers, 4, 3);

      $scope.blTopPlayers = getTopPlayers(12, 3, players);
      $scope.blTops = getTopValues($scope.blTopPlayers, 12, 3);

      $scope.rbTopPlayers = getTopPlayers(-2, 3, players);
      $scope.rbTops = getTopValues($scope.rbTopPlayers, -2, 3);

      $scope.stTopPlayers = getTopPlayers(11, 3, players);
      $scope.stTops = getTopValues($scope.stTopPlayers, 11, 3);

      $scope.toTopPlayers = getTopPlayers(5, 3, players);
      $scope.toTops = getTopValues($scope.rbTopPlayers, 5, 3);

    });
  });
