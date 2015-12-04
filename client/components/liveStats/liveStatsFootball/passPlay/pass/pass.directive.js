'use strict';

angular.module('abroadathletesApp')
  .directive('pass', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/passPlay/pass/pass.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.passActions = ["Complete", "Incomplete", "Intercept", "Sack"];
        $scope.otherActions = ["Touchdown", "Fumble", "Penalty", "Lateral", "Safety", "Spike"];
        $scope.otherActionsBool = [false, false,false,false,false,false];
        $scope.pass = -1;
        $scope.choosePassAction = function(ind) {
          $scope.pass = ind;
        };
        $scope.chooseOtherAction = function(ind) {
          if(ind == 0) {
            $scope.touchdown = true;
            $scope.otherActionsBool[4] = false;
            if($scope.event.team == 0) {
              $scope.event.data.gain = 100-$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon
            }
          }
          else if(ind == 4) {
            $scope.safety = true;
            if($scope.event.team == 0) {
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
          if($scope.pass == 0) {
            $scope.events.push({team:$scope.event.team, type:"complete", data:{passer:$scope.event.data.player, gain:0}})
          }
          else if($scope.pass == 1) {
            $scope.events.push({team:$scope.event.team, type:"incomplete", data:{passer:$scope.event.data.player, gain:0}})
          }
          else if($scope.pass == 2) {
            $scope.events.push({team:1-$scope.event.team, type:"intercept", data:{passer:$scope.event.data.player, gain:0}})
          }
          else if($scope.pass == 3) {
            $scope.events.push({team:$scope.event.team, type:"sack", data:{passer:$scope.event.data.player, gain:0}})
          }
        };

      },
      link: function (scope, element, attrs) {
      }
    };
  });
