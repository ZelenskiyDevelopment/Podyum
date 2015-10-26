'use strict';

angular.module('abroadathletesApp')
  .factory('Conversation', function (ConversationResource, Cache) {
    var ConversationCache = Cache.cacheResults('Conversation');
    return {
      createConversations: function (conversation) {
        return ConversationResource.create(conversation).$promise;
      },
      getConversations: function () {
        var path = 'conversations',
          getConversations = function(){
            return ConversationResource.getConversations();
          };
        return ConversationCache.getFromCache(path, getConversations);
      },
      createMessage: function (conversationId, message) {
        return ConversationResource.createMessage({id: conversationId}, message).$promise;
      },
      getMessages: function (conversationId) {
        var path = 'conversations.' + conversationId,
          getMessages = function(){
            return ConversationResource.getMessages({id: conversationId});
          };
        return ConversationCache.getFromCache(path, getMessages);
      }
    }
  });
