'use strict';

angular.module('abroadathletesApp')
  .factory('RoomResource', function ($resource) {
    return $resource('/api/rooms/:id/:thread/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {}
      },
      getRooms: {
        method: 'GET',
        isArray: true,
        params: {}
      },
      leaveRoom: {
        method: 'DELETE',
        params: {
          controller: 'leave'
        }
      },
      createThread: {
        method: 'POST',
        params: {
          controller: 'threads'
        }
      },
      getThreads: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'threads'
        }
      },
      createMessage: {
        method: 'POST',
        params: {
          controller: 'messages',
          thread:'@thread'
        }
      },
      getMessages: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'messages',
          thread:'@thread'
        }
      },
      updateRoom: {
        method: 'PUT',
        params: {}
      },
      leaveThread: {
        method: 'DELETE',
        params: {
          controller: 'leave',
          thread:'@thread'
        }
      },
      addToFavorite: {
        method: 'POST',
        params: {
          controller: 'favorite',
          thread:'@thread'
        }
      },
      removeFromFavorite: {
        method: 'DELETE',
        params: {
          controller: 'favorite',
          thread:'@thread'
        }
      }
    });
  });
