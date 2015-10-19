'use strict';

angular.module('abroadathletesApp')
  .directive('achievementsModal', function ($mdDialog) {
    return {
      templateUrl: 'components/achievements-modal/achievements-modal.html',
      restrict: 'EA',
      scope: {
        model: '='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              $scope.achievements = _.extend([], scope.model);

              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.callFunction = function() {
                scope.model = $scope.achievements;
                $mdDialog.hide();
              };
              $scope.addAchievement = function(){
                $scope.achievements.push({name:'', level:''});
              };

              $scope.removeAchievement = function(index){
                $scope.achievements.splice(index, 1);
              };
            },
            templateUrl: 'components/achievements-modal/modalTemplate.html',
            targetEvent: ev,
            parent: angular.element(document.body)
          });
        };
      }
    };
  });
