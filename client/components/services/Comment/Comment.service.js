'use strict';

angular.module('abroadathletesApp')
  .factory('Comment', function ($resource) {
    return $resource('api/comments/:id/:controller',{
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
      getAllComments: {
        method: 'GET',
        isArray: true,
        params: {}
      },
      getOwnComments: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'own'
        }
      },
      delete: {
        method: 'DELETE'
      }
      });
    });
