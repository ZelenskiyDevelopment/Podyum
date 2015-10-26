'use strict';

angular.module('abroadathletesApp')
  .factory('ConversationResource', function ($resource) {
    return $resource('/api/conversations/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {}
      },
      getConversations: {
        method: 'GET',
        isArray: true,
        params: {}
      },
      createMessage: {
        method: 'POST',
        params: {
          controller: 'message'
        }
      },
      getMessages: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'messages'
        }
      }
    });
  });
