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

        $scope.selectedPlaytype = -1;

        $scope.playtypes = ['run', 'pass', 'specialTeams', 'penalty'];

        $scope.gameStats = {
          ballPosition: 0,
          toGo: 0,
          teamOffence: 0,
          down: 1,
          quarter: 1,
          counter: 900,
          counterString: '15:00'
        };
        $scope.hostTeam = {
          timeouts: 3,
          topPlayers: {},
          roster: []
        };
        $scope.guestTeam = {
          timeouts: 3,
          topPlayers: {},
          roster: []
        };
        $scope.deffenceTeam = [];
        $scope.offenseTeam = [];


        $scope.selectedTacklers = [];
        $scope.selectedTacklersAsists = [];

        $scope.round = {};

        $scope.playbyplay = [];

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
              qtrString = 'End 4th Qtr';
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

          if (angular.isObject(chip)) {
            return chip;
          }

          return {name: chip, type: 'new'}
        }

        $scope.setCurrentPositionSelector = function (model) {
          $scope.positionElement = '$scope.' + model;
        };

        $scope.fieldClick = function ($event, isEndYardline) {
          var targetMark = angular.element($event.target)[0].attributes['data-mark'].value;
          var width = angular.element($event.target)[0].clientWidth;
          var clickPositionInYards = Math.round($event.offsetX * 0.1 / (width / 100));

          var yardsPosition = targetMark * 10 + clickPositionInYards;
          var relativePosition = $scope.gameStats.teamOffence == 0 ? yardsPosition : 100 - yardsPosition;

          if ($scope.positionElement != undefined && !isEndYardline) {
            eval($scope.positionElement + ' = relativePosition;');
          } else {
            $scope.round.endYardline = relativePosition;
          }
          $scope.run = '';
        };

        $scope.touchdown = function () {
          $scope.round.run = 'tochdown';
        };

        $scope.calculateGained = function (scope) {
          scope.gained = scope.end - scope.start;
        };

        $scope.getFieldMark = function (markNum) {
          var mark = markNum * 10;

          if (markNum == 5) {
            return mark;
          }

          if ($scope.gameStats.teamOffence == 0) {
            return mark + "";
          } else {
            return (mark * (-1)) + "";
          }
        };

        $scope.choosePlayer = function (playerNumber) {
          if ($scope.lastPlayerInputField != undefined) {
            eval('$scope.' + $scope.lastPlayerInputField + ' = playerNumber;');
          }
        };

        $scope.addTimeout = function (isHost) {
          if (isHost && $scope.hostTeam.timeouts < 3) {
            $scope.hostTeam.timeouts += 1;
          } else if (!isHost && $scope.guestTeam.timeouts < 3) {
            $scope.guestTeam.timeouts += 1;
          }
        };

        $scope.takeTimeout = function (isHost) {
          if (isHost && $scope.hostTeam.timeouts > 0) {
            $scope.hostTeam.timeouts -= 1;
          } else if (!isHost && $scope.guestTeam.timeouts > 0) {
            $scope.guestTeam.timeouts -= 1;
          }
        };

        $scope.manuallyChangeTimer = function () {

          var p = $scope.gameStats.counterString.split(':');
          $scope.gameStats.counter = (+p[0]) * 60 + (+p[1]);

          $scope.changingTimer = 0;
        };

        $scope.endQtr = function () {
          if ($scope.gameStats.quarter < 5) {
            $scope.gameStats.quarter = $scope.gameStats.quarter + 1;
            $scope.hostTeam.timeouts = 3;
            $scope.guestTeam.timeouts = 3;
          } else {
            $scope.game.data.finished = true;
          }
        };

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
          if (angular.isDefined(stop)) {
            $scope.stopCount();
          }
          else {
            $scope.isRunning = true;
            stop = $interval(function () {
              if ($scope.gameStats.counter > 0) {
                $scope.gameStats.counter = $scope.gameStats.counter - 1;
                $scope.counterText = $filter('timerDisplay')($scope.gameStats.counter);
              } else {
                $scope.stopCount();
                $scope.resetCount();
              }
            }, 1000);
          }
        };

        $scope.resetCount = function () {
          $scope.gameStats.counter = 900;
          if ($scope.gameStats.quart !== 4) {
            $scope.gameStats.quart += 1;
          }
          else {
            $scope.game.data.finished = true;
          }
        };

        $scope.stopCount = function () {
          if (angular.isDefined(stop)) {
            $scope.isRunning = false;
            $interval.cancel(stop);
            stop = undefined;
          }
        };


        $scope.submitPlay = function () {
          var events = [];

          switch ($scope.selectedPlaytype) {
            case 0: //run
              var event = {
                createdAt: $scope.gameStats.counterString,
                type: 'run',
                data: {
                  gain: $scope.round.gained,
                  player: $scope.round.runner
                }
              };
              events.push(event);
              event = {};

              if ($scope.round.run == 'tochdown') { //player scores touchdown

                if ($scope.gameStats.teamOffence == 0) {
                  $scope.game.data.score1 += 6;
                } else {
                  $scope.game.data.score2 += 6;
                }
                $scope.gameStats.ballPosition = 50;
                $scope.gameStats.teamOffence = !$scope.gameStats.teamOffence;
                $scope.gameStats.down = 1;

                event = {
                  createdAt: $scope.gameStats.counterString,
                  type: 'touchdown',
                  data: {
                    player: $scope.round.runner
                  }
                };
                events.push(event);
                event = {};
              }

              if ($scope.round.run == 'fumble') {
                event = {
                  createdAt: $scope.gameStats.counterString,
                  type: 'fumble',
                  data: {
                    player: $scope.round.runner,
                    caused: $scope.round.fambler,
                    recovered: $scope.round.recoverer,
                    gain: $scope.round.recoverEnd - $scope.round.recoverStart
                  }
                };
                events.push(event);
                event = {};
                if ($scope.round.runFumble == 'tochdown') { //+6
                  if ($scope.gameStats.teamOffence == 0) {
                    $scope.game.data.score1 += 6;
                  } else {
                    $scope.game.data.score2 += 6;
                  }
                  $scope.gameStats.ballPosition = 50;
                  $scope.gameStats.teamOffence = !$scope.gameStats.teamOffence;
                  $scope.gameStats.down = 1;
                  event = {
                    createdAt: $scope.gameStats.counterString,
                    type: 'touchdown',
                    data: {
                      player: $scope.round.recoverer
                    }
                  };
                  events.push(event);
                }
              }

              if ($scope.round.run == 'saftey') { //+2
                if ($scope.gameStats.teamOffence == 0) {
                  $scope.game.data.score1 += 2;
                } else {
                  $scope.game.data.score2 += 2;
                }
                $scope.gameStats.ballPosition = 20;
                $scope.gameStats.teamOffence = !$scope.gameStats.teamOffence;
                $scope.gameStats.down = 1;
                event = {
                  createdAt: $scope.gameStats.counterString,
                  type: 'safety',
                  data: {
                    player: $scope.round.runner
                  }
                };
                events.push(event);
              }

              if ($scope.round.run == 'kneel') {
                event = {
                  createdAt: $scope.gameStats.counterString,
                  type: 'kneel',
                  data: {
                    player: $scope.round.runner,
                    gain: $scope.round.gained
                  }
                };
                events.push(event);
              }
              break;
            case 1: //pass

              break;
            case 2: //Special teams

              break;
            case 3: //penalty

              break;
            default:
              break;
          }


          $scope.playbyplay.push(events);
          angular.forEach(events, function (value) {
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
          $scope.round = {};
          $scope.setOffence(!$scope.gameStats.teamOffence);
          $scope.selectedPlaytype = -1;
          $scope.playSelected = 0;
        };

      },
      link: function (scope, element, attrs) {
      }
    }
  });

