'use strict';

angular.module('abroadathletesApp')
  .directive('kickoff', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/kickoff/kickoff.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Touchback", "Onside", "Penalty", "Out of bounds", "No return"];
        $scope.otherActionsBool = [false, false,false,false,false];
        $scope.touchback = false;
        $scope.penalty = false;
        $scope.chooseOtherAction = function(ind) {
          if(ind == 0) {
            $scope.touchback = !$scope.touchback;
            if($scope.event.team == 0) {
              $scope.event.data.gain = 100-$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon
            }
          }
          else if(ind == 2) {
            $scope.penalty = !$scope.penalty;
          }
          else if(ind == 3) {
            $scope.event.data.result = "out";
            $scope.events.push({team: $scope.event.team, type:"out", data: {}})
          }
          else {
            $scope.otherActionsBool[ind] = !$scope.otherActionsBool[ind];
          }
        };
        $scope.next = function() {
          if($scope.otherActionsBool[2]) {
            $scope.events.push({
              team: $scope.event.data.teamRecovered,
              type: "penalty",
              data: {player: $scope.event.data.recovered}
            });
            $scope.penalty = false;
          }
          if($scope.touchback) {
            $scope.event.data.result = "touchback";
            $scope.submit();
          }
          else if($scope.otherActionsBool[4]) {
            $scope.event.data.result = "noreturn";
            $scope.submit();
          }
          else if($scope.otherActionsBool[1]) {
            $scope.event.data.result = "onside";
            $scope.events.push({team: $scope.event.team, type:"recover", data: {}});
          }
          else {
            $scope.event.data.result = "normal";
            $scope.events.push({team: 1-$scope.event.team, type:"return", data:{}});
          }
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
