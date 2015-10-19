/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model');

exports.register = function(socket) {

  User.schema.post('save', function (doc){
    onChange(socket, doc);
  });

};

function onChange(socket, doc, cb) {
  socket.emit('user', doc);
}
