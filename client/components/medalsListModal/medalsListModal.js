'use strict';

angular.module('abroadathletesApp')
  .factory('medalsListModal', function ($rootScope, $modal) {

      function openModal(scope, modalClass, size) {
        var modalScope = $rootScope.$new();
        scope = scope || {};
        size = size || 'md';
        angular.extend(modalScope, scope);
        return $modal.open({
          templateUrl: 'components/medalsListModal/medalsListModal.html',
          controller: medalListModalCtrl,
          scope: modalScope,
          size: size
        });
      }
      // Public API here
      return {
        open: function (medals, galleryModal) {
          medals = medals || [];
          openModal({
            medals: medals,
            galleryModal: galleryModal
          });
        }
      };
  });
