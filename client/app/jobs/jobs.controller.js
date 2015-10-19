'use strict';

angular.module('abroadathletesApp').controller('JobsCtrl', function ($scope, jobs, $timeout, Auth, jobTilesSettlement) {

  $scope.tilesSettlement = jobTilesSettlement.tilesSettlement;
  $scope.$watch('tilesSettlement', function(newTilesSettlement, oldTilesSettlement){
    if(newTilesSettlement === oldTilesSettlement){
      return;
    }
    $scope.changingJobTilesSettlmentFinished = false;
    $timeout(function(){
      $scope.changingJobTilesSettlmentFinished = true;
    });
  }, true);

  $scope.currentUser = Auth.getCurrentUser();

  $scope.updateCurrentUserField = function(fieldName, newValue){
    $scope.currentUser[fieldName] = newValue;
  };

  $scope.refreshJobsList = function() {
    $scope.changingJobTilesSettlmentFinished = false;
    return jobs.loadJobList().then(function(results) {
      $scope.jobs = results;
      $scope.changingJobTilesSettlmentFinished = true;
    });
  };

  $scope.refreshJobsList();

});
