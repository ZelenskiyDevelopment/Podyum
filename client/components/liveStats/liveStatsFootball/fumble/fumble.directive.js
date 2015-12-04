'use strict';

angular.module('abroadathletesApp')
  .directive('fumble', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/fumble/fumble.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Touchdown", "Fumble", "Penalty", "Lateral", "Safety"];
        $scope.otherActionsBool = [false, false,false,false,false];
        $scope.penalty = false;
        $scope.touchdown = false;
        $scope.safety = false;
        $scope.chooseOtherAction = function(ind) {
          if(ind == 0) {
            $scope.touchdown = true;
            $scope.otherActionsBool[4] = false;
            if($scope.event.teamRecovered == 0) {
              $scope.event.data.gain = 100-$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon
            }
          }
          else if(ind == 4) {
            $scope.safety = true;
            if($scope.event.teamRecovered == 0) {
              $scope.event.data.gain = -$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon-100;
            }
          }
          else if(ind == 2) {
            $scope.penalty = !$scope.penalty;
          }
          else {
            $scope.otherActionsBool[ind] = !$scope.otherActionsBool[ind];
          }
        };
        $scope.next = function() {
          if($scope.event.data.teamRecovered == 0 || $scope.event.data.teamRecovered == 1) {
            if($scope.event.data.recovered > 0) {
              if ($scope.penalty) {
                $scope.events.push({
                  team: $scope.event.data.teamRecovered,
                  type: "penalty",
                  data: {player: $scope.event.data.recovered, gain: 0}
                });
                $scope.penalty = false;
              }
              if ($scope.touchdown) {
                $scope.events.push({
                  team: $scope.event.data.teamRecovered,
                  type: "touchdown",
                  data: {player: $scope.event.data.recovered}
                })
                $scope.submit();
                $scope.touchdown = false;
              }
              else if ($scope.safety) {
                $scope.events.push({team: $scope.event.data.teamRecovered, type: "safety", data: {player: $scope.event.data.recovered, gain: 0}});
                $scope.events.push({team: 1 - $scope.event.data.teamRecovered, type: "tackle", data: {}});
                $scope.safety = false;
              }
              else if ($scope.otherActionsBool[1]) {
                $scope.events.push({team: $scope.event.data.teamRecovered, type: "fumble", data: {player: $scope.event.data.recovered, gain: 0}});
              }
              else if ($scope.otherActionsBool[3]) {
                $scope.events.push({
                  team: $scope.event.data.teamRecovered,
                  type: "lateral",
                  data: {player: $scope.event.data.recovered, gain: 0}
                });
              }
              else {
                $scope.events.push({team: 1 - $scope.event.data.teamRecovered, type: "tackle", data: {}});
              }
              if($scope.event.data.teamRecovered == 0) {
                $scope.status.ballon += $scope.event.data.gain;
              }
              else {
                $scope.status.ballon -= $scope.event.data.gain;
              }
              if($scope.status.offense == $scope.event.data.teamRecovered) {
                $scope.status.togo -= $scope.event.data.gain;
              }
              else {
                $scope.status.togo += $scope.event.data.gain;
              }
            }
          }
          else {
            $scope.submit();
          }

        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
