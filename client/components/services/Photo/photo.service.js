'use strict';

angular.module('abroadathletesApp')
  .factory('photo', function ($resource) {
      return $resource('/api/photos/:id/:controller', {
        id: '@_id'
      }, {
        create: {
          method: 'POST',
          params: {}
        },
        get: {
          method: 'GET',
          params: {}
        },
        addComment: {
          method: 'POST',
          params: {
            id: '@id',
            controller: 'addComment'
          },
          isArray: true
        },
        addMedal: {
          method: 'POST',
          params: {
            id: '@id',
            controller: 'addMedal'
          },
          isArray: true
        },
        getAllPhotos: {
          method: 'GET',
          isArray: true,
          params: {}
        },
        getOwnPhotos: {
          method: 'GET',
          isArray: true,
          params: {
            controller: 'own'
          }
        }
      });
  });
