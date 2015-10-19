'use strict';

angular.module('abroadathletesApp')
  .directive('milestonesFootballCreator', function (FootballStatNames) {
    return {
      templateUrl: 'components/milestoneCreator/milestoneCreatorModal/milestonesFootballCreator/milestonesFootballCreator.html',
      restrict: 'E',
      scope: {
        milestone: '='
      },
      link: function (scope, element, attrs) {
        scope.milestone.sport = 'football'
      },
      controller: function($scope){
        $scope.statsTypes = ['rushing', 'passing', 'receiving', 'defense', 'scoring', 'returning', 'kicking', 'punting'];
        $scope.subtypeDisabled = true;
        $scope.$watch(function(){return $scope.milestone.kind}, function(newValue, oldValue){
          if(!_.isUndefined(newValue)) {
            $scope.subkinds = FootballStatNames.getStatNamesForType(newValue);
            $scope.subtypeDisabled = false;
          }
        })
      }
    };
  });