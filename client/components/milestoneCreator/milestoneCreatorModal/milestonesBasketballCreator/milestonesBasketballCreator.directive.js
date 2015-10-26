'use strict';

angular.module('abroadathletesApp')
  .directive('milestonesBasketballCreator', function () {
    return {
      templateUrl: 'components/milestoneCreator/milestoneCreatorModal/milestonesBasketballCreator/milestonesBasketballCreator.html',
      restrict: 'E',
      scope: {
        milestone: '='
      },
      link: function (scope, element, attrs) {
        scope.kinds = ["FT Made", "FG Made", "3-point Made", "Off Rebound", "Assist", "Turnover", "FT Missed", "FG Missed", "3-point Missed", "Foul", "Def Rebound", "Steal","Block","Minutes played"];
        scope.milestone.sport = 'basketball';
      },
      controller: function($scope){
        $scope.createMilestone = function(){
          console.log($scope.milestone);
        }
      }
    };
  });