/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var _ = require('lodash');
var socketsMap = {};

// When the user disconnects.. perform this
function onDisconnect(socket) {
//  console.log(socket)
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/milestone/milestone.socket').register(socket);
  require('../api/comment/comment.socket').register(socket);
  require('../api/photo/photo.socket').register(socket);
  require('../api/jobs/jobs.socket').register(socket);
  require('../api/conversation/conversation.socket').register(socket);
  require('../api/room/room.socket').register(socket);
  require('../api/event/event.socket').register(socket);
  require('../api/game/game.socket').register(socket);
//  require('../api/upload/upload.socket').register(socket);
  require('../api/user/user.socket').register(socket);
}

module.exports = function (socketio) {
  if(socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));

    socketio.on('connection', function (socket) {
      socket.address = socket.handshake.address !== null ?
      socket.handshake.address.address + ':' + socket.handshake.address.port :
        process.env.DOMAIN;

      socket.connectedAt = new Date();

      // Call onDisconnect.
      socket.on('disconnect', function () {
        onDisconnect(socket);
        console.info('[%s] DISCONNECTED', socket.address);
        var removedSockets = _.remove(socketsMap[socket.userId], function (s) {
          return s === socket;
        });

        console.log('deleted ' + removedSockets.length + ' from map');
      });

      socket.on('id', function (data) {
        if(socket.userId && socket.userId !== data.id){
          var removedSockets = _.remove(socketsMap[socket.userId], function (s) {
            return s === socket;
          });
        }
        if (data.id) {
          if (data.id in socketsMap && !_.contains(socketsMap[data.id], socket)) {
            socketsMap[data.id].push(socket);
          } else {
            socketsMap[data.id] = [socket];
          }
          socket.userId = data.id;
        }

        console.info('[%s] ID', data);
      });

      // Call onConnect.
      onConnect(socket);
      console.info('[%s] CONNECTED', socket.address);
    });
  }
  return {
    directMessage: function(id, message, data){
      _.each(socketsMap[id], function(s){
        s.emit(message, data);
      });
    }
  };
};
