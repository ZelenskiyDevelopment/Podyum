'use strict';

angular.module('abroadathletesApp')
  .directive('return', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/return/return.html',
      restrict: 'EA',
      scope: {
        event: '=',
        events: '=',
        status: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.otherActions = ["Fair Catch", "Touchdown", "Fumble", "Penalty", "Lateral"];
        $scope.otherActionsBool = [false, false,false,false,false];
        $scope.penalty = false;
        $scope.touchdown = false;
        $scope.fairCatch = false;
        $scope.chooseOtherAction = function(ind) {
          if(ind == 1) {
            $scope.touchdown = true;
            if($scope.event.team == 0) {
              $scope.event.data.gain = 100-$scope.ballon;
            }
            else {
              $scope.event.data.gain = $scope.ballon
            }
          }
          else if(ind == 3) {
            $scope.penalty = !$scope.penalty;
          }
          else if(ind == 0) {
            $scope.fairCatch = true;
          }
          else {
            $scope.otherActionsBool[ind] = !$scope.otherActionsBool[ind];
          }
        };
        $scope.next = function() {
          if($scope.event.data.player > 0) {
            if($scope.penalty) {
              $scope.events.push({team:$scope.event.team, type:"penalty", data:{player:$scope.event.data.player}});
              $scope.penalty = false;
            }
            if($scope.touchdown) {
              $scope.events.push({team:$scope.event.team, type:"touchdown", data:{player:$scope.event.data.player}})
              $scope.submit();
              $scope.touchdown = false;
            }
            else if($scope.fairCatch) {
              $scope.event.data.fairCatch = true;
              $scope.fairCatch = false;
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
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
