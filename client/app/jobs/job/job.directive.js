'use strict';

angular.module('abroadathletesApp').directive('job', function(jobs, Auth, $mdDialog) {
  return {
    restrict: 'E',
    templateUrl: 'app/jobs/job/job.html',
    scope: false,
    link: function(scope, element, attrs){
      scope.mainTile = attrs.mainTile || false;
      scope.job.isFavourite = checkIfUsersFavourite();

      scope.removeJob = function(){
        jobs.removeJob(scope.job).then(function(){
          scope.refreshJobsList();
        });
      };

      scope.markJobAsUsersFavourite = function(){
        jobs.markJobAsFavourite(scope.job, scope.currentUser).then(function(newFavouriteJobsList){
          scope.job.isFavourite = !scope.job.isFavourite;
          scope.updateCurrentUserField('favouriteJobs', newFavouriteJobsList.data);
        });
      };

      scope.openJobModal  = function(event){
        $mdDialog.show({
          controller: OpenJobModalController,
          templateUrl: 'app/jobs/job/jobDetailsModal.html',
          targetEvent: event,
          size: 'md',
          parent: angular.element(document.body),
          clickOutsideToClose:true
        }).then(function() {
          openApplyJobModal(event);
        });
      };

      function openApplyJobModal(event){
        var receiver = scope.job.employer;
        $mdDialog.show({
          controller: 'sendMessageModalController',
          resolve: {
            room: function () {
              return scope.room;
            },
            receiver: function () {
              return receiver;
            }
          },
          templateUrl: 'components/sendMessageModal/modalTemplate.html',
          targetEvent: event,
          parent: angular.element(document.body),
          disableParentScroll: false
        });
      }

      function checkIfUsersFavourite(){
        if(!scope.currentUser.favouriteJobs || !scope.job) {
          return false;
        }
        return scope.currentUser.favouriteJobs.some(function(favouriteJob){
          return favouriteJob._id === scope.job._id;
        });
      }

      function OpenJobModalController($scope, $mdDialog){
        $scope.job = scope.job;
        $scope.prettyJobDate = new Date(scope.job.date).toLocaleString();
        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.applyForJob = function(){
          $mdDialog.hide();
        };

      }
    }
  }
});
