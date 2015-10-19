'use strict';

angular.module('abroadathletesApp')
  .directive('specialTeams', function () {
    return {
      templateUrl: 'components/liveStats/liveStatsFootball/specialTeams/specialTeams.html',
      restrict: 'EA',
      scope: {
        status: '=',
        swap: '=',
        game: '=',
        team: '=',
        events: '=',
        submit: '='
      },
      controller: function($scope) {
        $scope.specialActions = ["Kickoff", "Punt", "Field Goal", "Point After"];
        $scope.chooseSpecialAction = function(ind) {
          if(ind == 0) {
            $scope.events.push({team: $scope.offense, type:"kickoff", data: {gain: 0}})
          }
          else if(ind == 1) {
            $scope.events.push({team: $scope.offense, type:"punt", data: {}})
          }
          else if(ind == 2) {
            $scope.events.push({team: $scope.offense, type:"fieldgoal", data: {gain: 0}})
          }
          else if(ind == 3) {
            $scope.events.push({team: $scope.offense, type:"pointafter", data: {}})
          }
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
