'use strict';

angular.module('abroadathletesApp')
  .directive('pointAfter', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/pointAfter/pointAfter.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.good = false;
        $scope.blocked = false;
        $scope.penalty = false;
        $scope.type = 0;
        $scope.types = ["Kick", "Run", "Pass"];
        $scope.chooseOtherType = function(ind) {
          $scope.type = ind;
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
          if($scope.type == 0) {
            $scope.event.data.type = "kick";
            if($scope.good) {
              $scope.event.data.result = "good";
            }
            else if($scope.blocked) {
              $scope.event.data.result = "blocked";
            }
            else {
              $scope.event.data.result = "no good";
            }
          }
          else if($scope.type == 1) {
            $scope.event.data.type = "run";
            if($scope.good) {
              $scope.event.data.result = "good";
            }
            else {
              $scope.event.data.result = "no good";
            }
          }
          else if($scope.type == 2) {
            $scope.event.data.type = "pass";
            if($scope.receiver) {
              $scope.event.data.receiver = $scope.receiver;
            }
            if($scope.good) {
              $scope.event.data.result = "good";
            }
            else {
              $scope.event.data.result = "no good";
            }
          }
          if($scope.good) {
            $scope.event.data.result = "good";
            $scope.submit();
          }
          else if($scope.blocked) {
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
