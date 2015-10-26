'use strict';

angular.module('abroadathletesApp').directive('jobsFiltering', function (jobTilesSettlement) {
    return {
      templateUrl: 'app/jobs/jobsFiltering/jobsFiltering.html',
      restrict: 'EA',
      scope: false,
      link: function (scope, element, attrs) {
        scope.isAdvancedOpen = jobTilesSettlement.openedPanels.advancedFiltering;
        scope.onAdvancedChange = function(){
          if(!scope.isAdvancedOpen) {
            jobTilesSettlement.advancedFilteringOnShow();
          }
          else {
            jobTilesSettlement.advancedFilteringOnHide();
          }
        };


      }
    };
  });
