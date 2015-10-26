'use strict';

angular.module('abroadathletesApp')
  .factory('galleryModal', function ($rootScope, $modal, Auth) {
    // Service logic
    // ...

    function openModal(scope, modalClass, size) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'gallery-modal-window';
      size = size || 'lg';
      angular.extend(modalScope, scope);
      return $modal.open({
        templateUrl: 'components/galleryModal/galleryModal.html',
        windowClass: modalClass,
        scope: modalScope,
        size: size
      });
    }
    // Public API here
    return {
      open: function (photos, index, callback) {
          photos = photos || [];
          callback = callback || angular.noop;
          openModal({
            currentUser: Auth.getCurrentUser(),
            photos: photos,
            index: index,
            callback: callback
          });
      }
    };
  });
