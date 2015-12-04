'use strict';

angular.module('abroadathletesApp').controller('easyModalCtrl', function ($scope, $mdDialog, value) {
  console.log(value);
  $scope.value = value;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.applyForJob = function(){
    $mdDialog.hide($scope.value);
  };

});
