'use strict';

angular.module('abroadathletesApp')
  .directive('milestones', function (Milestone, Auth) {
    return {
      templateUrl: 'components/milestones/milestones.html',
      restrict: 'E',
      transclude: true,
      scope: {
        userPromise: '='
      },
      link: function (scope, element, attrs) {

      },
      controller: function($scope){
        if(!_.isUndefined($scope.userPromise)) {
          $scope.userPromise.then(function (user) {
            $scope.user = user;
            fetchMyMilestones();
          });
        }
        else{
          $scope.user = Auth.getCurrentUser();
          fetchMyMilestones();
        }
        $scope.fetchMyMilestones = fetchMyMilestones;
        function fetchMyMilestones(){
          Milestone.getOwn({creator: $scope.user._id}).$promise.then(function(response){
            $scope.myMilestonesGroups = _.keys(_.groupBy(response, function(milestone){return milestone.kind}));
            $scope.myMilestones = _.groupBy(response, function(milestone){return milestone.kind});
            console.log($scope.myMilestonesGroups);
            console.log($scope.myMilestones);
          });
        }
      }
    };
  });