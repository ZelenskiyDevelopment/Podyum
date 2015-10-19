'use strict';

var _ = require('lodash'),
  Conversation = require('./conversation.model'),
  socket = require('../../config/socketio.js')(),
  PopulateUtils = require('../../components/utils/PopulateUtils');

exports.index = function (req, res) {
  var userId = req.user._id,
    project = {
      members: 1
    },
    populateOptions = PopulateUtils.userPopulateOptions('members');

  Conversation.find({members: userId}, project)
    .populate(populateOptions)
    .execQ()
    .then(function (conversations) {
      return res.json(200, conversations);
    }).catch(function (err) {
      return handleError(res, err);
    });
};

exports.create = function (req, res) {
  req.body.members = _.union(req.body.members, [req.user._id.toString()]);
  Conversation.createQ(req.body).then(function (conversation) {
    var options = PopulateUtils.userPopulateOptionsArray(['members', 'messages.author']);
    Conversation.populateQ(conversation, options).then(function (result) {
      _.each(req.body.members, function (memberId) {
        socket.directMessage(memberId, 'conversations', result);
      });
    });

    return res.json(201, conversation);
  }).catch(function (err) {
    return handleError(res, err);
  });
};

exports.getMessages = function (req, res) {
  var userId = req.user._id,
    conversationId = req.params.id,
    query = {
      members: userId,
      _id: conversationId
    },
    populateOptions = PopulateUtils.userPopulateOptions('messages.author');

  Conversation.findOne(query, {messages: 1})
    .populate(populateOptions)
    .execQ()
    .then(function (result) {
      return res.json(_.get(result, 'messages', []));
    }).catch(function (err) {
      return handleError(res, err)
    });
};

exports.createMessage = function (req, res) {
  var message = {
      content: req.body.content,
      author: req.user._id,
      date: new Date()
    },
    query = {
      _id: req.params.id,
      members: req.user._id
    },
    updateQuery = {
      $push: {
        messages: message
      }
    };

  Conversation.findOneAndUpdateQ(query, updateQuery, {}).then(function (users) {
    var options = PopulateUtils.userPopulateOptionsArray('author');
    Conversation.populateQ(message, options).then(function (result) {
      _.each(users.members, function (memberId) {
        socket.directMessage(memberId, 'conversations.' + req.params.id, result);
      });
    });
    return res.send(200);
  }).catch(function (err) {
    return handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
