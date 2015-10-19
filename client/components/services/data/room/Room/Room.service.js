'use strict';

angular.module('abroadathletesApp')
  .factory('Room', function (RoomResource, $q, socket, Cache) {
    var RoomCache = Cache.cacheResults('Room');
    return {
      createRoom: function (room) {
        return RoomResource.create(room);
      },
      getRooms: function () {
        var path = 'rooms';
        var getRooms = function () {
          return RoomResource.getRooms();
        };

        return RoomCache.getFromCache(path, getRooms);
      },
      leaveRoom: function (roomId) {
        return RoomResource.leaveRoom({id: roomId}).$promise;
      },
      createThread: function (roomId, thread) {
        return RoomResource.createThread({id: roomId}, thread);
      },
      getThreads: function (roomId) {
        var path = 'threads.' + roomId;
        var getThreads = function () {
          return RoomResource.getThreads({id: roomId});
        };
        return RoomCache.getFromCache(path, getThreads);
      },
      createMessage: function (roomId, threadId, message) {
        return RoomResource.createMessage({id: roomId, thread: threadId}, message);
      },
      getMessages: function (roomId, threadId) {
        var path = 'messages.' + roomId + '.' + threadId;
        var getMessages = function () {
          return RoomResource.getMessages({id: roomId, thread: threadId});
        };
        return RoomCache.getFromCache(path, getMessages);
      },
      updateRoom: function (roomId, room) {
        return RoomResource.updateRoom({id: roomId}, room);
      },
      leaveThread: function (roomId, threadId) {
        return RoomResource.leaveThread({id: roomId, thread: threadId})
        .$promise.then(function (result) {
            var cacheObject = RoomCache.getCacheObject();
          _.remove(_.get(cacheObject, 'threads.' + roomId).result, function (item) {
            return item._id === threadId;
          });
          return result;
        });
      },
      addToFavorite: function (roomId, threadId) {
        return RoomResource.addToFavorite({id: roomId, thread: threadId}, {}).$promise;
      },
      removeFromFavorite: function (roomId, threadId) {
        return RoomResource.removeFromFavorite({id: roomId, thread: threadId}, {}).$promise;
      }
    }
  });
