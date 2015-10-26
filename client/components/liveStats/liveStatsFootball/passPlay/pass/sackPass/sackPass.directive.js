'use strict';

angular.module('abroadathletesApp')
  .directive('sackPass', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/passPlay/pass/sackPass/sackPass.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Fumble", "Penalty", "Safety"];
        $scope.otherActionsBool = [false, false,false];
        $scope.chooseOtherAction = function(ind) {
          if(ind == 2) {
            $scope.safety = true;
            if($scope.event.team == 0) {
              $scope.event.data.gain = -$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon-100;
            }
          }
          else if(ind == 1) {
            $scope.penalty = !$scope.penalty;
          }
          else {
            $scope.otherActionsBool[ind] = !$scope.otherActionsBool[ind];
          }
        };
        $scope.next = function() {
          if ($scope.penalty) {
            $scope.events.push({
              team: $scope.event.team,
              type: "penalty",
              data: {player: $scope.event.data.passer}
            });
            $scope.penalty = false;
          }
          if ($scope.safety) {
            $scope.events.push({
              team: $scope.event.team,
              type: "safety",
              data: {player: $scope.event.data.passer}
            });
            $scope.events.push({team: 1 - $scope.event.team, type: "tackle", data: {}});
            $scope.safety = false;
          }
          else if ($scope.otherActionsBool[0]) {
            $scope.events.push({
              team: $scope.event.team,
              type: "fumble",
              data: {player: $scope.event.data.passer}
            });
          }
          else {
            $scope.events.push({team: 1 - $scope.event.team, type: "tackle", data: {}});
          }
          if($scope.event.team == 0) {
            $scope.status.ballon += $scope.event.data.gain;
          }
          else {
            $scope.status.ballon -= $scope.event.data.gain;
          }
          if($scope.status.offense == $scope.event.team) {
            $scope.status.togo -= $scope.event.data.gain;
          }
          else {
            $scope.status.togo += $scope.event.data.gain;
          }
        }
      },
      link: function (scope, element, attrs) {
      }
    };
  });
