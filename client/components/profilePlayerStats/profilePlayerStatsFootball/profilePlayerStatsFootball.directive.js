'use strict';

angular.module('abroadathletesApp')
  .directive('profilePlayerStatsFootball', function() {
    return {
      templateUrl: 'components/profilePlayerStats/profilePlayerStatsFootball/profilePlayerStatsFootball.html',
      restrict: 'EA',
      scope: {
        user: '='
      },
      controller: function($scope, Game, FootballStatNames) {
        $scope.statTypes = ['Rushing', 'Passing', 'Receiving', 'Defense', 'Scoring', 'Returning', 'Kicking', 'Punting'];
        $scope.rushingStatsNames = FootballStatNames.getStatNamesForType('rushing');
        $scope.passingStatsNames = FootballStatNames.getStatNamesForType('passing');
        $scope.receivingStatsNames = FootballStatNames.getStatNamesForType('receiving');
        $scope.defenseStatsNames = FootballStatNames.getStatNamesForType('defense');
        $scope.scoringStatsNames = FootballStatNames.getStatNamesForType('scoring');
        $scope.returningStatsNames = FootballStatNames.getStatNamesForType('returning');
        $scope.kickingStatsNames = FootballStatNames.getStatNamesForType('kicking');
        $scope.puntingStatsNames = FootballStatNames.getStatNamesForType('punting');
        $scope.statsNames = {
          Rushing: FootballStatNames.getStatNamesForType('rushing'),
          Passing: FootballStatNames.getStatNamesForType('passing'),
          Receiving: FootballStatNames.getStatNamesForType('receiving'),
          Defense: FootballStatNames.getStatNamesForType('defense'),
          Scoring: FootballStatNames.getStatNamesForType('scoring'),
          Returning: FootballStatNames.getStatNamesForType('returning'),
          Kicking: FootballStatNames.getStatNamesForType('kicking'),
          Punting: FootballStatNames.getStatNamesForType('punting')
        };
        $scope.statLenByType = [$scope.rushingStatsNames.length, $scope.passingStatsNames.length, $scope.receivingStatsNames.length,
          $scope.defenseStatsNames.length, $scope.scoringStatsNames.length, $scope.returningStatsNames.length,
          $scope.kickingStatsNames.length, $scope.puntingStatsNames.length
        ];
        $scope.currentActiveType = 'Rushing';
        $scope.currentActiveTypeInd = 0;
        $scope.changeStatType = function(type, ind) {
          $scope.currentActiveType = type;
          $scope.currentActiveTypeInd = ind;
        };
        Game.getGamesForTeams({
          id: $scope.user._id
        }).$promise.then(function(games) {
          _.remove(games, function(game) {
            return !game.data.isFinished || !game.userData;
          });
          $scope.games = games;

          $scope.myGameStats = new Array($scope.games.length);
          for (var i = 0; i < $scope.games.length; i++) {
            if ($scope.games[i].userData && $scope.games[i].userData[$scope.user._id]) {
              $scope.myGameStats[i] = $scope.games[i].userData[$scope.user._id];
            }
          }
          $scope.myStats = new Array($scope.statTypes.length);
          for (var i = 0; i < $scope.myStats.length; i++) {
            $scope.myStats[i] = {
              name: $scope.statTypes[i],
              data: _.fill(Array($scope.statLenByType[i]), 0)
            };
          }

          for (var i = 0; i < $scope.myGameStats.length; i++) {
            for (var j = 0; j < $scope.statTypes.length; j++) {
              for (var k = 0; k < $scope.statLenByType[j]; k++) {
                if ($scope.myGameStats[i]) {
                  $scope.myStats[j].data[k] += $scope.myGameStats[i][j].data[k];
                }
              }
            }
          }
        });
      },
      link: function(scope, element, attrs) {}
    };
  });