'use strict';

angular.module('abroadathletesApp').directive('favouriteJobs', function (jobTilesSettlement, $timeout) {
    return {
      templateUrl: 'app/jobs/favouriteJobs/favouriteJobs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.isFavouriteOpen = jobTilesSettlement.openedPanels.favouriteJobs;
        scope.onFavouriteChange = function(){
          if(!scope.isFavouriteOpen) {
            jobTilesSettlement.favouriteJobsOnShow();
          }
          else {
            jobTilesSettlement.favouriteJobsOnHide();
          }
        };
        scope.$watch('currentUser.favouriteJobs', function(){
          recalculateFavouriteJobsList();
        });

        function recalculateFavouriteJobsList(){
          var favouriteJobsIds = _.pluck(scope.currentUser.favouriteJobs, '_id');
          scope.favouriteJobs = _.filter(scope.jobs, function(job){
            return _.includes(favouriteJobsIds, job._id);
          });
        }
      }
    };
  });
