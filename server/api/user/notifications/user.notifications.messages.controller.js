var _ = require('lodash'),
  User = require('./../user.model'),
  Q = require('q'),
  socket = require('../../../config/socketio.js')(),
  PopulateUtils = require('../../../components/utils/PopulateUtils');

exports.getMessagesNotifications = function (req, res, next) {
  var userId = req.user._id,
    options = PopulateUtils.userPopulateOptions('messages.author');
  User.findById(userId, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, users) {
      if (err) return next(err);
      if (!users) return res.send(401);
      res.json(users.messages);
    });
};

exports.readMessage = function (req, res, next) {
  var userId = req.user._id,
    threadId = req.body.thread,
    roomId = req.body.id;

  var query = {
    _id: userId,
    'messages.room': roomId,
    'messages.thread': threadId
  };

  var updateQuery = {
    $set: {
      'messages.$.read': true
    }
  };

  User.update(query, updateQuery, {}, function (err) {
    // socket.directMessage(destUserId, 'assignRequest', mappedRequest);
    if (err) return validationError(res, err);
    res.send(200);
  });
};

exports.addMessageNotification = function (userId, roomId, threadId, sender, message) {
  var messagePrefix = message.slice(0, 97);
  if (messagePrefix.length !== message.length) {
    messagePrefix += '...';
  }
  var isRead = userId.toString() === sender.toString();
  var query = {
    _id: userId,
    'messages.room': roomId,
    'messages.thread': threadId
  };

  var updateQuery = {
    $set: {
      'messages.$.read': isRead,
      'messages.$.messagePrefix': messagePrefix,
      'messages.$.sender': sender,
      date: new Date()
    }
  };

  var createQuery = {
    $push: {
      'messages': {
        read: isRead,
        messagePrefix: messagePrefix,
        sender: sender,
        room: roomId,
        thread: threadId
      }
    }
  };

  User.update(query, updateQuery, {}, function (err, x, y) {
    if(x === 0) {
      User.update({_id: userId}, createQuery, {}, function (err, x, y) {

      });
    }
    // socket.directMessage(destUserId, 'assignRequest', mappedRequest);
  });
};


function validationError(res, err) {
  return res.json(422, err);
}

