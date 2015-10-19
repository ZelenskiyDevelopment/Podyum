/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Milestone = require('./milestone.model');

exports.register = function(socket) {
  Milestone.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Milestone.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('milestone:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('milestone:remove', doc);
}