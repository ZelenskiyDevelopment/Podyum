/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Jobs = require('./jobs.model');

exports.register = function(socket) {
  Jobs.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Jobs.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('jobs:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('jobs:remove', doc);
}
