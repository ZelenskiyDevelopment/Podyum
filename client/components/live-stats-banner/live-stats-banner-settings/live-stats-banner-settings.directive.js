'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsBannerSettings', function ($mdDialog) {
    return {
      templateUrl: 'components/live-stats-banner/live-stats-banner-settings/live-stats-banner-settings.html',
      restrict: 'E',
      scope: {
        settings: '='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              $scope.settings = _.clone(scope.settings);
              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.answer = function (answer) {
                _.merge(scope.settings, $scope.settings);
                scope.settings.$save({controller:'settings'});
                $mdDialog.hide(answer);
              };
            },
            templateUrl: 'components/live-stats-banner/live-stats-banner-settings/modal-template.html',
            parent: angular.element(document.body),
            targetEvent: ev
          });
        };
      }
    };
  });
