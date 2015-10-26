'use strict';
angular.module('abroadathletesApp').controller('milestoneCreatorModalCtrl', milestoneCreatorModalCtrl);

milestoneCreatorModalCtrl.$inject = ['$scope', 'Milestone'];

function milestoneCreatorModalCtrl($scope, Milestone){
    $scope.milestone = {};
    $scope.milestone.creator = $scope.user;
    $scope.createMilestone = function(){
        var modalInstance = this;
        Milestone.create($scope.milestone)
        .$promise.then(function (response) {
             $scope.callbackFunction();
             modalInstance.$dismiss();
        });
    };

    $scope.dismissModal = function(){
        this.$dismiss();
    };
}