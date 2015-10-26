'use strict';

angular.module('abroadathletesApp')
  .directive('milestoneCreator', function (milestoneCreatorModal, Auth) {
    return {
      templateUrl: 'components/milestoneCreator/milestoneCreator.html',
      restrict: 'E',
      scope: {
        user: '=',
        callbackFunction: '='
      },
      link: function (scope, element, attrs) {},
      controller: function($scope){
        $scope.createMilestone = function(){
          $scope.user = $scope.user || Auth.getCurrentUser();
          milestoneCreatorModal.open($scope.user._id, $scope.callbackFunction);
        }
      }
    };
  });