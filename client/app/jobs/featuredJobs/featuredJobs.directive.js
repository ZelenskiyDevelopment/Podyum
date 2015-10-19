'use strict';

angular.module('abroadathletesApp')
  .directive('featuredJobs', function (jobTilesSettlement) {
    return {
      templateUrl: 'app/jobs/featuredJobs/featuredJobs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.featuredJobs = _.filter(scope.jobs, {featured: true});
        scope.isFeaturedOpen = jobTilesSettlement.openedPanels.featuredJobs;
        scope.featuredLimit = scope.isFeaturedOpen ? undefined : 2;
        scope.onFeaturedChange = function(){
          if(!scope.isFeaturedOpen) {
            jobTilesSettlement.featuredJobsOnShow();
          }
          else {
            jobTilesSettlement.featuredJobsOnHide();
          }
        };
      }
    };
  });
