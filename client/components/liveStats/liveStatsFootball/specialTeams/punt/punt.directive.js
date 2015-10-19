'use strict';

angular.module('abroadathletesApp')
  .directive('punt', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/punt/punt.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Touchback", "Fumble", "Penalty", "Safety","Blocked", "No return"];
        $scope.otherActionsBool = [false, false,false,false,false,false];
        $scope.touchback = false;
        $scope.penalty = false;
        $scope.safety = false;
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
            $scope.safety = true;
            if($scope.event.team == 0) {
              $scope.event.data.gain = -$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon-100;
            }
          }
          else {
            $scope.otherActionsBool[ind] = !$scope.otherActionsBool[ind];
          }
        };
        $scope.next = function() {
          if($scope.penalty) {
            $scope.events.push({
              team: $scope.event.team,
              type: "penalty",
              data: {player: $scope.event.data.player}
            });
            $scope.penalty = false;
          }
          if($scope.touchback) {
            $scope.event.data.result = "touchback";
            $scope.submit();
          }
          else if($scope.safety) {
            $scope.events.push({team:$scope.event.team, type:"safety", data:{player:$scope.event.data.player}});
            $scope.events.push({team:1-$scope.event.team, type:"tackle", data:{}});
            $scope.safety = false;
          }
          else if($scope.otherActionsBool[5]) {
            $scope.event.data.result = "noreturn";
            $scope.submit();
          }
          else if($scope.otherActionsBool[4]) {
            $scope.event.data.result = "blocked";
            $scope.events.push({team: $scope.event.team, type:"recover", data: {}});
          }
          else if($scope.otherActionsBool[1]) {
            $scope.events.push({team:$scope.event.team, type:"fumble", data:{player:$scope.event.data.player}});
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
