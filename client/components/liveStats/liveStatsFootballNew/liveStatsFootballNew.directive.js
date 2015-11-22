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

        $scope.penaltyList = [
          {
            name: 'False start',
            yards: 5
          },
          {
            name: 'Holding (offence)',
            yards: 10
          },
          {
            name: 'Holding (defence)',
            yards: 5,
            firstDown: true
          },
          {
            name: 'Offside',
            yards: 5
          },
          {
            name: 'Personal foul',
            yards: 15
          },
          {
            name: 'Encroachment',
            yards: 5
          },
          {
            name: 'Pass interference',
            yards: 15,
            firstDown: true,
            spot: true
          },
          {
            name: 'Personal foul',
            yards: 15
          },
          {
            name: 'Roughing the kicker',
            yards: 15,
            firstDown: true
          },
          {
            name: 'Roughing the passer',
            yards: 15,
            firstDown: true
          }
        ];

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
        $scope.deffenceTeam = [];
        $scope.offenseTeam = [];


        $scope.selectedTacklers = [];
        $scope.selectedTacklersAsists = [];

        $scope.round = {};

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

        $scope.setOffence = function (index) {
          $scope.gameStats.teamOffence = index;
          $scope.selectedTacklersAsists = [];
          $scope.selectedTacklers = [];
          $scope.offenseTeam = index == 0 ? $scope.roster1 : $scope.roster2;
          $scope.deffenceTeam = index == 0 ? $scope.roster2 : $scope.roster1;
        };

        function transformChip(chip) {

          console.log('Transform chips');

          if (angular.isObject(chip)) {
            return chip;
          }

          return { name: chip, type: 'new' }
        }

        $scope.setCurrentPositionSelector = function (model) {
          $scope.positionElement = '$scope.' + model;
        };

        $scope.fieldClick = function($event, isEndYardline){
          var targetMark = angular.element($event.target)[0].attributes['data-mark'].value;
          var width = angular.element($event.target)[0].clientWidth;
          var clickPositionInYards = Math.round($event.offsetX * 0.1 /(width/100));

          var yardsPosition = targetMark * 10 + clickPositionInYards;
          var relativePosition = $scope.gameStats.teamOffence == 0 ? yardsPosition : 100 - yardsPosition;

          if($scope.positionElement != undefined && !isEndYardline) {
            eval($scope.positionElement + ' = relativePosition;');
          } else {
            $scope.round.endYardline = relativePosition;
          }
          $scope.run = '';
        };

        $scope.touchdown = function() {
          $scope.round.run = 'tochdown';
        };

        $scope.calculateGained = function (scope) {
          scope.gained = scope.end - scope.start;
        };

        $scope.getFieldMark = function (markNum) {
          var mark = markNum*10;

          if(markNum == 5) {
            return mark;
          }

          if($scope.gameStats.teamOffence == 0){
            return mark + "";
          } else {
            return (mark * (-1)) + "";
          }
        };

        $scope.submitPlay = function() {
          console.log('SubmitPlay');
        };

      },
      link: function (scope, element, attrs) {
      }
    }
  });

