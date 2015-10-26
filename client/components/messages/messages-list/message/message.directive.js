'use strict';

angular.module('abroadathletesApp')
  .directive('message', function () {
    return {
      templateUrl: 'components/messages/messages-list/message/message.html',
      restrict: 'E',
      scope:{
        message:'='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
