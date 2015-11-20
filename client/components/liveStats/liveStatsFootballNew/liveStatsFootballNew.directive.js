/**
 * Created by nicko on 18.11.2015.
 */
'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsFootballNew', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootballNew/liveStatsFootballNew.html',
      restrict: 'EA',
      scope: {
        user: '=',
        game: '=',
        roster1: '=',
        roster2: '='
      },
      controller: function ($scope, $interval, $timeout, $filter, User, Game, GameMessage, notify) {
        $scope.gameStats = {
          ballPosition: 0,
          toGo: 0,
          teamOffence: 0,
          down: 0,
          quarter: 1,
          counter: 900,
          counterString: '15:00'
        };
        $scope.hostTeam = {
          timeouts: 3,
          topPlayers:{},
          roster: []
        };
        $scope.guestTeam = {
          timeouts: 3,
          topPlayers:{},
          roster: []
        };



        $scope.getQuarterString = function () {
          var qtrString = '';
          switch ($scope.gameStats.quarter) {
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

      },
      link: function (scope, element, attrs) {
      }
    }
  });

