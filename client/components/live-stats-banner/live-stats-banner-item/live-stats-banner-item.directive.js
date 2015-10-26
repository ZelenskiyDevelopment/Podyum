'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsBannerItem', function () {
    return {
      templateUrl: 'components/live-stats-banner/live-stats-banner-item/live-stats-banner-item.html',
      restrict: 'E',
      scope:{
        game:'='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
