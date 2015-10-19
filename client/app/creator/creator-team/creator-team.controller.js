'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorTeamCtrl', function ($scope, PlayLevels) {
    $scope.playLevels = PlayLevels.getPlayLevels($scope.formData.sport);
  });
