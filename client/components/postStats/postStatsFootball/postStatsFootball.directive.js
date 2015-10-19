'use strict';

angular.module('abroadathletesApp')
  .directive('postStatsFootball', function () {
    return {
      templateUrl: 'components/postStats/postStatsFootball/postStatsFootball.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      controller: function($scope, $interval, $timeout, User, Game, FootballStatNames) {
        var oldUserData;
        var statLen;
        $timeout(function() {

          $scope.statTypes = ['Rushing', 'Passing', 'Receiving', 'Defense', 'Scoring', 'Returning', 'Kicking', 'Punting'];
          $scope.rushingStatsNames = FootballStatNames.getStatNamesForType('rushing');
          $scope.passingStatsNames = FootballStatNames.getStatNamesForType('passing');
          $scope.receivingStatsNames = FootballStatNames.getStatNamesForType('receiving');
          $scope.defenseStatsNames = FootballStatNames.getStatNamesForType('defense');
          $scope.scoringStatsNames = FootballStatNames.getStatNamesForType('scoring');
          $scope.returningStatsNames = FootballStatNames.getStatNamesForType('returning');
          $scope.kickingStatsNames = FootballStatNames.getStatNamesForType('kicking');
          $scope.puntingStatsNames = FootballStatNames.getStatNamesForType('punting');
          $scope.statsNames = {Rushing:FootballStatNames.getStatNamesForType('rushing'), Passing: FootballStatNames.getStatNamesForType('passing'),
                              Receiving:FootballStatNames.getStatNamesForType('receiving'), Defense: FootballStatNames.getStatNamesForType('defense'),
                              Scoring:FootballStatNames.getStatNamesForType('scoring'), Returning: FootballStatNames.getStatNamesForType('returning'),
                              Kicking:FootballStatNames.getStatNamesForType('kicking'), Punting: FootballStatNames.getStatNamesForType('punting')};
          $scope.statLenByType = [$scope.rushingStatsNames.length, $scope.passingStatsNames.length, $scope.receivingStatsNames.length,
                                  $scope.defenseStatsNames.length, $scope.scoringStatsNames.length, $scope.returningStatsNames.length,
                                  $scope.kickingStatsNames.length, $scope.puntingStatsNames.length];

          $scope.currentActiveType = '';
          $scope.currentActiveTypeInd = -1;

          if(!$scope.game.data.T1) {
            $scope.game.data.T1 = [];
          }
          if(!$scope.game.data.T2) {
            $scope.game.data.T2 = [];
          }
          for(var i = 0; i < $scope.statTypes.length; i++) {
            if(!$scope.game.data.T1[i]) {
              $scope.game.data.T1[i] = {name:$scope.statTypes[i], data: _.fill(Array($scope.statLenByType[i]),0)};
            }
            if(!$scope.game.data.T2[i]) {
              $scope.game.data.T2[i] = {name:$scope.statTypes[i], data: _.fill(Array($scope.statLenByType[i]),0)};
            }
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
              $scope.game.userData[$scope.roster1[i]._id] = [];
              for(var j = 0; j < $scope.statTypes.length; j++) {
                if (!$scope.game.userData[$scope.roster1[i]._id][j]) {
                  $scope.game.userData[$scope.roster1[i]._id][j] = {
                    name: $scope.statTypes[j],
                    data: _.fill(Array($scope.statLenByType[j]), 0)
                  };
                }
              }
            }
            for(var i = 0; i < $scope.roster2.length; i++) {
              $scope.game.userData[$scope.roster2[i]._id] = [];
              for(var j = 0; j < $scope.statTypes.length; j++) {
                if (!$scope.game.userData[$scope.roster2[i]._id][j]) {
                  $scope.game.userData[$scope.roster2[i]._id][j] = {
                    name: $scope.statTypes[j],
                    data: _.fill(Array($scope.statLenByType[j]), 0)
                  };
                }
              }
            }
          }
        };

        $scope.changeStatType = function(type, ind) {
          $scope.currentActiveType = type;
          $scope.currentActiveTypeInd = ind;
        };

        $scope.finishGame = function() {
          $scope.game.data.isFinished = true;
          if($scope.game.data.score1 > $scope.game.data.score2) {
            $scope.game.data.winner = 1
          }
          else {
            $scope.game.data.winner = 2;
          }
     //     Game.postData({id:$scope.game._id, data:$scope.game.data});
          $scope.save();
        };

        $scope.check = function() {
          $scope.isCorrect = true;
          for(var i = 0; i < $scope.statTypes.length; i++) {
            $scope.game.data.T1[i] = {name:$scope.statTypes[i], data: _.fill(Array($scope.statLenByType[i]),0)};
            $scope.game.data.T2[i] = {name:$scope.statTypes[i], data: _.fill(Array($scope.statLenByType[i]),0)};
          }
          if($scope.isCorrect) {
            for (var i = 0; i < $scope.roster1.length; i++) {
              for (var j = 0; j < $scope.statTypes.length; j++) {
                for (var k = 0; k < $scope.statLenByType[j]; k++) {
                  $scope.game.data.T1[j].data[k] += $scope.game.userData[$scope.roster1[i]._id][j].data[k];
                }
              }
            }
            for (var i = 0; i < $scope.roster2.length; i++) {
              for (var j = 0; j < $scope.statTypes.length; j++) {
                for (var k = 0; k < $scope.statLenByType[j]; k++) {
                  $scope.game.data.T2[j].data[k] += $scope.game.userData[$scope.roster2[i]._id][j].data[k];
                }
              }
            }
          }
        };

        $scope.save = function() {
          $scope.check();
          Game.postUserData({id: $scope.game._id, data: $scope.game.userData});
          Game.postData({id:$scope.game._id, data:$scope.game.data});
          oldUserData = angular.copy($scope.game.userData);
        }

      },
      link: function (scope, element, attrs) {
      }
    };
  });
