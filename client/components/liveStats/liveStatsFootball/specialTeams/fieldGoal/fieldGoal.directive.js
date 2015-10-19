'use strict';

angular.module('abroadathletesApp')
  .directive('fieldGoal', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/fieldGoal/fieldGoal.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Good", "Blocked", "Penalty"];
        $scope.otherActionsBool = [false, false,false];
        $scope.good = false;
        $scope.blocked = false;
        $scope.penalty = false;
        $scope.chooseOtherAction = function(ind) {
          if(ind == 0) {
            $scope.good = !$scope.good;
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
          if($scope.good) {
            $scope.event.data.result = "good";
            $scope.submit();
          }
          else if($scope.otherActionsBool[1]) {
            $scope.event.data.result = "blocked";
            $scope.submit();
          }
          else {
            $scope.event.data.result = "no good";
            $scope.submit();
          }
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
