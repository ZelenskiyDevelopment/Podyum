'use strict';

angular.module('abroadathletesApp')
  .directive('run', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/runPlay/run/run.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Touchdown", "Fumble", "Penalty", "Lateral", "Safety", "Kneel"];
        $scope.otherActionsBool = [false, false,false,false,false,false];
        $scope.penalty = false;
        $scope.touchdown = false;
        $scope.safety = false;
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
          if($scope.event.data.player > 0) {
            if($scope.event.team == 0) {
              $scope.status.ballon += $scope.event.data.gain;
            }
            else {
              $scope.status.ballon -= $scope.event.data.gain;
            }
            $scope.status.togo -= $scope.event.data.gain;
            if($scope.penalty) {
              $scope.events.push({team:$scope.event.team, type:"penalty", data:{player:$scope.event.data.player}});
              $scope.penalty = false;
            }

            if($scope.touchdown) {
              $scope.events.push({team:$scope.event.team, type:"touchdown", data:{player:$scope.event.data.player}})
              $scope.submit();
              $scope.touchdown = false;
            }
            else if($scope.safety) {
              $scope.events.push({team:$scope.event.team, type:"safety", data:{player:$scope.event.data.player}});
              $scope.events.push({team:1-$scope.event.team, type:"tackle", data:{}});
              $scope.safety = false;
            }
            else if($scope.otherActionsBool[5]) {
              $scope.events.push({team:$scope.event.team, type:"kneel", data:{player:$scope.event.data.player}});
              $scope.submit();
            }
            else if($scope.otherActionsBool[1]) {
              $scope.events.push({team:$scope.event.team, type:"fumble", data:{player:$scope.event.data.player}});
            }
            else if($scope.otherActionsBool[3]) {
              $scope.events.push({team:$scope.event.team, type:"lateral", data:{player:$scope.event.data.player}});
            }
            else {
              $scope.events.push({team:1-$scope.event.team, type:"tackle", data:{}});
            }
          }
          console.log($scope.events);
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
