'use strict';

angular.module('abroadathletesApp')
  .directive('topPlayers', function () {
    return {
      templateUrl: 'components/topPlayers/topPlayers.html',
      restrict: 'EA',
      scope: {
        header: '@',
        players: '=',
        values: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
