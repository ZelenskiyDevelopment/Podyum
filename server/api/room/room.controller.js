'use strict';

var _ = require('lodash'),
  Room = require('./room.model'),
  socket = require('../../config/socketio.js')(),
  PopulateUtils = require('../../components/utils/PopulateUtils');
var mongoose = require('mongoose-q')();
var messageNotificationsCtrl = require('../user/notifications/user.notifications.messages.controller');

exports.index = function (req, res) {
  var userId = req.user._id;
  Room.find({members: userId})
    .populate({
      path: 'members',
      select: 'kind player team league fan coach profilePhoto _id'
    })
    .exec(function (err, rooms) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, rooms);
    });
};

exports.show = function (req, res) {
  var userId = req.user._id;
  var populateOptionsMembers = PopulateUtils.userPopulateOptions('members'),
    populateOptionsTeam = PopulateUtils.userPopulateOptions('team');

  Room.find({_id: req.params.id, members: userId})
    .populate(populateOptionsMembers)
    .populate(populateOptionsTeam)
    .exec(function (err, room) {
      if (err) {
        return handleError(res, err);
      }
      if (!room) {
        return res.send(404);
      }
      return res.json(room);
    });
};

exports.showThreads = function (req, res) {
  var userId = req.user._id,
    options = PopulateUtils.userPopulateOptions('members');

  Room.find({_id: req.params.id, members: userId}, 'threads')
    .populate(options)
    .exec(function (err, room) {
      if (err) {
        return handleError(res, err);
      }
      if (!room) {
        return res.send(404);
      }
      var followedThreads = _.filter(_.first(room).threads, function (thread) {
        return _.find(thread.members, function (item) {
          return item.toString() === req.user._id.toString();
        });
      });
      return res.json(followedThreads);
    });
};

exports.showMessages = function (req, res) {
  var roomId = req.params.id,
    threadId = req.params.thread;

  var query = {
    _id: roomId,
    threads: {
      $elemMatch: {
        _id: threadId
      }
    }
  };

  Room.findOne(query, 'threads', function (err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }
    var roomObject = room.toObject();
    var messages = _.find(roomObject.threads, function (thread) {
      return thread._id.toString() === threadId;
    }).messages;
    var options = PopulateUtils.userPopulateOptionsArray('author');
    Room.populate(messages, options, function (err, results) {
      if (err)  handleError(res, err);
      return res.json(results);
    });
  });
};

exports.create = function (req, res) {
  var newRoom = req.body;
  newRoom.members.push(req.user._id);
  newRoom.admins = [req.user._id];
  Room.create(newRoom, function (err, room) {
    if (err) {
      return handleError(res, err);
    }
    var options = PopulateUtils.userPopulateOptionsArray(['members', 'team']);
    Room.populate(room, options, function (err, result) {
      if (err)  handleError(res, err);
      _.each(newRoom.members, function (member) {
        socket.directMessage(member, 'rooms', result);
      });
    });
    return res.json(201, room);
  });
};

exports.createThread = function (req, res) {
  var newThread = req.body,
    roomId = req.params.id;
  Room.findById(roomId, function (err, room) {
    var roomObject = room.toObject();
    newThread.members = roomObject.members;
    room.threads.push(newThread);
    room.save(function (err, room) {
      if (err) {
        return handleError(res, err);
      }
      var updatedRoom = room.toObject();
      var thread = _.findLast(updatedRoom.threads, function (thread) {
        return thread.name === newThread.name;
      });
      _.each(roomObject.members, function (member) {
        socket.directMessage(member, 'threads.' + roomId, {}[roomId] = thread);
      });

      return res.json(200, room);
    });
  });
};

exports.createMessage = function (req, res) {
  var newMessage = req.body,
    roomId = req.params.id,
    threadId = req.params.thread;
  newMessage.author = req.user._id;

  var query = {
    _id: roomId,
    threads: {
      $elemMatch: {
        _id: threadId
      }
    }
  };

  Room.findOne(query, function (err, room) {
    var roomObject = room.toObject();
    var threadIndex = _.findIndex(roomObject.threads, function (thread) {
      return thread._id.toString() === threadId;
    });
    room.threads[threadIndex].messages.push(newMessage);
    room.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      var options = PopulateUtils.userPopulateOptionsArray('author');
      Room.populate(newMessage, options, function (err, result) {
        if (err)  handleError(res, err);
        _.each(room.threads[threadIndex].members, function (member) {
          socket.directMessage(member, 'messages.' + roomId + '.' + threadId, result);
          messageNotificationsCtrl.addMessageNotification(member, roomId, threadId, req.user._id, newMessage.content);
        });

        return res.json(200, room);
      });
    });
  });
};

exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Room.update({_id: req.params.id, admins: req.user._id}, {$set: req.body}, {}, function (err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }

    var options = PopulateUtils.userPopulateOptions('members');
    Room.findOne({_id: req.params.id})
      .populate(options)
      .exec(function (err, room) {
        var members = room.toObject().members;
        var updatedProperties = req.body;
        if (!_.isEmpty(updatedProperties.members)) {
          updatedProperties.members = members;
        }
        _.each(members, function (member) {
          socket.directMessage(member._id, 'update.rooms', {_id: req.params.id, updatedObject: updatedProperties});
        });
      });

    return res.json(200);
  });
};

exports.destroy = function (req, res) {
  var userId = req.user._id,
    threadId = req.params.thread;
  Room.find({_id: req.params.id, members: userId}, function (err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }

    var threadIndex = _.findIndex(room[0].threads, function (item) {
      return item._id.toString() === threadId.toString()
    });

    var path = 'threads.' + threadIndex + '.members';
    var query = {
      $pull: _.zipObject([path], [mongoose.Types.ObjectId(userId)])
    };
    Room.update({_id: req.params.id, members: userId}, query, {}, function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.favorite = function (req, res) {
  var user = req.user._id,
    roomId = req.params.id,
    threadId = req.params.thread;

  var query = {
    _id: roomId,
    threads: {
      $elemMatch: {
        _id: threadId
      }
    }
  };

  Room.findOne(query, function (err, room) {
    var roomObject = room.toObject();
    var threadIndex = _.findIndex(roomObject.threads, function (thread) {
      return thread._id.toString() === threadId;
    });
    room.threads[threadIndex].favorite.push(user);
    room.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, room);
    });
  });
};

exports.leaveFavorite = function (req, res) {
  var user = req.user._id,
    roomId = req.params.id,
    threadId = req.params.thread;

  var query = {
    _id: roomId,
    threads: {
      $elemMatch: {
        _id: threadId
      }
    }
  };

  Room.findOne(query, function (err, room) {
    var roomObject = room.toObject();
    var threadIndex = _.findIndex(roomObject.threads, function (thread) {
      return thread._id.toString() === threadId;
    });
    room.threads[threadIndex].favorite.remove(user);
    room.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, room);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

exports.createRoom = function (team, title, members, cb) {
  var newRoom = {
    title: title,
    members: members,
    team: team,
    admins: [team],
    threads: []
  };
  Room.create(newRoom, function (err, room) {
    if (cb) {
      cb(err, room);
    }
  });
};

exports.leaveRoom = function (req, res) {
  var user = req.user._id,
    roomId = req.params.id;

  var query = {
    _id: roomId
  };

  var updateQuery = {
    $pull: {
      members: user
    }
  };

  Room.updateQ(query, updateQuery, {})
    .then(function () {
      return res.send(200);
    }).catch(function (err) {
      return handleError(res, err);
    });
};
