'use strict';

angular.module('abroadathletesApp').directive('sendMessageModal', function ($mdDialog, Conversation, Auth) {
    return {
      templateUrl: 'components/sendMessageModal/sendMessageModal.html',
      restrict: 'EA',
      scope: {
        receiver:'='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: 'sendMessageModalController',
            resolve: {
              room: function () {
                return scope.room;
              },
              receiver: function () {
                return scope.receiver;
              }
            },
            templateUrl: 'components/sendMessageModal/modalTemplate.html',
            targetEvent: ev,
            parent: angular.element(document.body),
            disableParentScroll: false
          });
        };
      }
    };
  });
