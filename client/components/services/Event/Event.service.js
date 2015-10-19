'use strict';

angular.module('abroadathletesApp')
  .factory('Event', function ($resource) {
    return $resource('/api/events/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {}
      },
      addComment: {
        method: 'POST',
        params: {
          id: '@id',
          controller: 'addComment'
        }
      },
      sendCongrats: {
        method: 'POST',
        params: {
          id: '@id',
          controller: 'sendCongrats'
        }
      },
      share: {
        method: 'POST',
        params: {
          id: '@id',
          controller: 'share'
        }
      },
      get: {
        method: 'GET',
        params: {}
      },
      getAllEvents: {
        method: 'GET',
        isArray: true,
        params: {}
      },
      getOwnEvents: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'own'
        }
      }
    });
  });
