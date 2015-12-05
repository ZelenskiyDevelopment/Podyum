'use strict';

angular.module('abroadathletesApp')
  .factory('Event', function ($resource) {
    return $resource('/api/events/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {
            id: '@id',
            controller: 'create'
        }
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
      getMyPosts: {
        method: 'GET',
        isArray: true,
        params: {
            controller: 'getMyPosts'
        }
      },
      getOwnEvents: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'own'
        }
      },
      getOwnEventsById: {
        method: 'GET',
        isArray: true,
        id: '@id',
        params: {
          controller: 'getOwnEventsById'
        }
      }
    });
  });
