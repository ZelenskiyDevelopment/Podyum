'use strict';

angular.module('abroadathletesApp').directive('createJob', function ($mdDialog, jobs, dataLoader) {
    return {
      templateUrl: 'app/jobs/createJob/createJob.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.createJob = function(event) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/jobs/createJob/createJobModal.html',
            targetEvent: event,
            parent: document.body,
            clickOutsideToClose:true
          }).then(function(createdJob) {
            jobs.createJob(createdJob).then(function(){
              scope.refreshJobsList();
            });
          });
        };

        function DialogController($scope, $mdDialog) {
          $scope.job = {
            name: undefined,
            description: undefined,
            taken: false,
            featured: false,
            reward: undefined,
            date: new Date(),
            employer: scope.currentUser,
            employee: null,
            city: undefined,
            team: scope.currentUser.team
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submitJob = function() {
            $scope.job.employer = $scope.job.employer._id;
            $scope.job.team =  $scope.job.team.name;
            $mdDialog.hide($scope.job);
          };

        }
      }
    };
  });
