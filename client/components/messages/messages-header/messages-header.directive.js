'use strict';

angular.module('abroadathletesApp')
  .directive('messagesHeader', function () {
    return {
      templateUrl: 'components/messages/messages-header/messages-header.html',
      restrict: 'E',
      scope:{
        search:'=',
        team:'=?'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
