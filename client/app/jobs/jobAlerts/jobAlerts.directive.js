'use strict';

angular.module('abroadathletesApp')
  .directive('jobAlerts', function (jobTilesSettlement) {
    return {
      templateUrl: 'app/jobs/jobAlerts/jobAlerts.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var onInit = function(){
          scope.alertedJobs = _.sortBy(scope.jobs, function(job){
            return new Date(job.date);
          });
          scope.isAlertedOpen = jobTilesSettlement.openedPanels.alertedJobs;
          scope.alertedJobsLimit = scope.isAlertedOpen ? 5 : 2;
        }();

        scope.onAlertedChange = function(){
          if(!scope.isAlertedOpen) {
            jobTilesSettlement.alertedJobsOnShow();
          }
          else {
            jobTilesSettlement.alertedJobsOnHide();
          }
        };
      }
    };
  });
