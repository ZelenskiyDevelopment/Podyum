'use strict';

angular.module('abroadathletesApp')
  .factory('milestoneCreatorModal', function ($rootScope, $modal, Auth) {
    // Service logic
    // ...

      function openModal(scope, modalClass, size, controller) {
        var modalScope = $rootScope.$new();
        scope = scope || {};
        size = size || 'lg';
        modalClass = modalClass || 'milestone-modal-window';
        controller = controller || 'milestoneCreatorModalCtrl';
        angular.extend(modalScope, scope);
        return $modal.open({
          templateUrl: 'components/milestoneCreator/milestoneCreatorModal/milestoneCreatorModal.html',
          scope: modalScope,
          controller: controller,
          windowClass: modalClass,
          size: size
        });
      }
    return {
      open: function (user, callbackFunction) {
        return openModal({user: user, callbackFunction: callbackFunction});
      }
    };
  });
