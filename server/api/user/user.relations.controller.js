var _ = require('lodash'),
  User = require('./user.model'),
  Q = require('q'),
  socket = require('../../config/socketio.js')(),
  PopulateUtils = require('../../components/utils/PopulateUtils');

exports.invite = function (req, res, next) {
  var userId = req.user._id;
  var destUserId = req.body.id;

  User.findById(userId, function (err, user) {
    User.findById(destUserId, function (err, destUser) {
      destUser.invitation.push(user);
      var userObj = user.toObject();
      var mappedUser = {
        firstName: userObj[userObj.kind].firstName,
        lastName: userObj[userObj.kind].lastName,
        profilePhoto: userObj.profilePhoto,
        _id: userObj._id
      };
      socket.directMessage(destUserId, 'invitation', mappedUser);
      user.invited.push(destUser);
      user.save(function (err1) {
        destUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.acceptInvitation = function (req, res, next) {
  var userId = req.user._id;
  var fromUserId = req.body.id;

  User.findById(userId, function (err, user) {
    User.findById(fromUserId, function (err, fromUser) {
      fromUser.invitation.remove(user);
      user.invited.remove(fromUser);
      fromUser.invited.remove(user);
      user.invitation.remove(fromUser);
      fromUser.friends.push(user);
      user.friends.push(fromUser);
      var newNotification = {
        kind: "friendAccepted",
        data: {
          _id: user._id,
          firstName: user[user.kind].firstName,
          lastName: user[user.kind].lastName,
          profilePhoto: user.profilePhoto
        }
      };
      fromUser.newNotification.push(newNotification);
      socket.directMessage(fromUserId, 'notification', newNotification);

      user.save(function (err1) {
        fromUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.rejectInvitation = function (req, res, next) {
  var userId = req.user._id;
  var fromUserId = req.body.id;

  User.findById(userId, function (err, user) {
    User.findById(fromUserId, function (err, fromUser) {
      fromUser.invitation.remove(user);
      user.invited.remove(fromUser);
      fromUser.invited.remove(user);
      user.invitation.remove(fromUser);
      user.save(function (err1) {
        fromUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.getInvitations = function (req, res, next) {
  var userId = req.user._id,
    options = PopulateUtils.userPopulateOptions('invitation');
  User.findById(userId, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, users) {
      if (err) return next(err);
      if (!users) return res.send(401);
      res.json(users.invitation);
    });
};

exports.getNotifications = function (req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    res.json(user.notification);
  });
};

exports.getNewNotifications = function (req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    res.json(user.newNotification);
  });
};

exports.updateNotifications = function (req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    var noti = user.toObject().notification;
    var newNoti = user.toObject().newNotification;
    noti = newNoti.concat(noti);
    user.notification = noti;
    user.newNotification = [];
    user.save(function (err1) {
      if (err1) return validationError(res, err);
      res.send(200);
    });
  });
};

exports.getAssignRequestsAsAdmin = function(req, res, next) {
  var userId = req.user._id;
  var destUserId = req.params.id;
    options = PopulateUtils.userPopulateOptions('assignRequests.user');
  User.findById(destUserId, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, users) {
      if (_.indexOf(users.rosterAdmins, userId) !== -1) return res.send(401);
      if (err) return next(err);
      if (!users) return res.send(401);
      res.json(users.assignRequests);
    });
};

exports.getAssignRequests = function (req, res, next) {
  var userId = req.user._id,
    options = PopulateUtils.userPopulateOptions('assignRequests.user');
  User.findById(userId, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, users) {
      if (err) return next(err);
      if (!users) return res.send(401);
      res.json(users.assignRequests);
    });
};

exports.unFriendUser = function (req, res, next) {
  var userId = req.user._id;
  var destUserId = req.body.id;

  User.findById(userId, function (err, user) {
    User.findById(destUserId, function (err, destUser) {
      destUser.friends.remove(user);
      user.friends.remove(destUser);
      user.save(function (err1) {
        destUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.grantStatsAdmin = function (req, res, next) {
  var userId = req.user._id,
    destUserId = req.body.data.id,
    userQuery = getAddToArrayQuery('statsAdmins', destUserId),
    destUserQuery = getAddToArrayQuery('managesStats', userId),
    promises = [
      User.findByIdAndUpdateQ({_id: userId}, userQuery, {}),
      User.findByIdAndUpdateQ({_id: destUserId}, destUserQuery, {})
    ];
  Q.all(promises).then(function (results) {
    var user = results[0];
    var destUser = results[1];
    var newNotification = {
      kind: "statsAdminGranted",
      data: {_id: user._id, name: user[user.kind].name, profilePhoto: user.profilePhoto}
    };
    destUser.newNotification.push(newNotification);
    socket.directMessage(destUserId, 'notification', newNotification);
    destUser.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

exports.revokeStatsAdmin = function (req, res, next) {
  var userId = req.user._id,
    destUserId = req.body.data.id,
    userQuery = getRemoveFromArrayQuery('statsAdmins', destUserId),
    destUserQuery = getRemoveFromArrayQuery('managesStats', userId),
    promises = [
      User.findByIdAndUpdateQ({_id: userId}, userQuery, {}),
      User.findByIdAndUpdateQ({_id: destUserId}, destUserQuery, {})
    ];
  Q.all(promises).then(function (results) {
    var user = results[0];
    var destUser = results[1];
    var newNotification = {
      kind: "statsAdminRevoked",
      data: {_id: user._id, name: user[user.kind].name, profilePhoto: user.profilePhoto}
    };
    destUser.newNotification.push(newNotification);
    socket.directMessage(destUserId, 'notification', newNotification);
    destUser.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

exports.grantRosterAdmin = function(req, res, next) {
  var userId = req.user._id,
    destUserId = req.body.data.id,
    userQuery = getAddToArrayQuery('rosterAdmins', destUserId),
    destUserQuery = getAddToArrayQuery('managesRoster', userId),
    promises = [
      User.findByIdAndUpdateQ({_id: userId}, userQuery, {}),
      User.findByIdAndUpdateQ({_id: destUserId}, destUserQuery, {})
    ];
  Q.all(promises).then(function (results) {
    var user = results[0];
    var destUser = results[1];
    var newNotification = {
      kind: "rosterAdminGranted",
      data: {_id: user._id, name: user[user.kind].name, profilePhoto: user.profilePhoto}
    };
    destUser.newNotification.push(newNotification);
    socket.directMessage(destUserId, 'notification', newNotification);
    destUser.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

exports.revokeRosterAdmin = function(req, res, next) {
  var userId = req.user._id,
    destUserId = req.body.data.id,
    userQuery = getRemoveFromArrayQuery('rosterAdmins', destUserId),
    destUserQuery = getRemoveFromArrayQuery('managesRoster', userId),
    promises = [
      User.findByIdAndUpdateQ({_id: userId}, userQuery, {}),
      User.findByIdAndUpdateQ({_id: destUserId}, destUserQuery, {})
    ];
  Q.all(promises).then(function (results) {
    var user = results[0];
    var destUser = results[1];
    var newNotification = {
      kind: "rosterAdminRevoked",
      data: {_id: user._id, name: user[user.kind].name, profilePhoto: user.profilePhoto}
    };
    destUser.newNotification.push(newNotification);
    socket.directMessage(destUserId, 'notification', newNotification);
    destUser.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

exports.getUserStatsAdmins = function(req, res, next) {
  var userId = req.params.id,
    optionsStatsAdmins = PopulateUtils.userPopulateOptions('statsAdmins');
  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsStatsAdmins)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

exports.getUserManagesStats = function(req, res, next) {
  var userId = req.params.id,
    optionsManagesStats = PopulateUtils.userPopulateOptions('managesStats');
  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsManagesStats)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

exports.getUserRosterAdmins = function(req, res, next) {
  var userId = req.params.id,
    optionsRosterAdmins = PopulateUtils.userPopulateOptions('rosterAdmins');
  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsRosterAdmins)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

exports.getUserManagesRoster = function(req, res, next) {
  var userId = req.params.id,
    optionsManagesRoster = PopulateUtils.userPopulateOptions('managesRoster');
  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsManagesRoster)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
}

//exports.getUserByTeam = function (req, res, next) {
//  var userId = req.params.id,
//    optionsAssignedTo = PopulateUtils.userPopulateOptions('assignedTo.user'),
//    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user');
//
//  User.findById(userId, '-salt -hashedPassword')
//    .populate(optionsAssignedTo)
//    .populate(optionsAssigned)
//    .exec(function (err, user) {
//      if (err) return next(err);
//      if (!user) return res.send(401);
//      res.json(user);
//    });
//};

exports.getUsersAndFollowersByTeam = function (req, res, next) {
  var userId = req.params.id,
    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user'),
    optionsFollowed = PopulateUtils.userPopulateOptions('followed');

  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsAssigned)
    .populate(optionsFollowed)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });

};

exports.getUserFriends = function (req, res, next) {
  var userId = req.params.id,
    options = PopulateUtils.userPopulateOptions('friends');
  User.findById(userId, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

exports.getNewGameData = function (req, res, next) {
  var userId = req.user._id,
    optionsAssignedTo = PopulateUtils.userPopulateOptions('assignedTo.user'),
    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user');
  User.findById(userId, '-salt -hashedPassword')
    .populate(optionsAssignedTo)
    .populate(optionsAssigned)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      var userObject = user.toObject();
      if (userObject.kind === 'team') {
        User.find({'kind': 'team'}, function (err, teams) {
          if (err) return res.send(500, err);
          res.json({
            ownerId: req.user._id,
            ownerKind: 'team',
            ownerName: userObject.team.name,
            ownerSport: userObject.sport,
            leagues: _.map(_.filter(userObject.assignedTo, function (league) {
              return league.isPresent;
            }), function (assignedToUser) {
              return {
                name: assignedToUser.user[assignedToUser.user.kind].name,
                _id: assignedToUser.user._id
              };
            }),
            teams: _.map(_.filter(teams, function (team) {
              return team.sport === userObject.sport && team._id.toString() !== userId.toString();
            }),
              function (team) {
                return {
                  _id: team._id,
                  name: team.team.name,
                  leagues: _.map(_.filter(team.assignedTo, function (league) {
                      return league.isPresent;
                    }),
                    function (league) {
                      return league.user;
                    })
                };
              })
          });
        });
      }
      else if (userObject.kind === 'league') {
        res.json({
          ownerId: req.user._id,
          ownerKind: 'league',
          ownerSport: userObject.sport,
          teams: _.map(
            _.filter(userObject.assigned, function (team) {
              return team.isPresent;
            }), function (assignedUser) {
              return {
                name: assignedUser.user[assignedUser.user.kind].name,
                _id: assignedUser.user._id
              };
            })
        });
      } else {
        return res.send(401);
      }
    });
};

var getUsersAssignedToTeam = function (req, res, next, type) {
  var userId = req.params.id,
    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user');

  User.find({_id: userId, kind: 'team'}, '-salt -hashedPassword')
    .populate(optionsAssigned)
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      var coaches = _.filter(user.toObject().assigned, function (assigned) {
        return assigned.user.kind === type;
      });
      res.json(coaches);
    });
};

exports.getCoachesAssignedToTeam = function (req, res, next) {
  getUsersAssignedToTeam(req, res, next, 'coach');
};

exports.getPlayersAssignedToTeam = function (req, res, next) {
  getUsersAssignedToTeam(req, res, next, 'player');
};

exports.getMyTeams = function (req, res, next) {
  var userId = req.user._id,
    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user');

  User.find({'assigned.user': userId, kind: 'team', 'assigned.isPresent': true}, '-salt -hashedPassword')
    .populate(optionsAssigned)
    .exec(function (err, users) {
      if (err) return next(err);
      if (!users) return res.send(401);
      res.json(users);
    });
};

function validationError(res, err) {
  return res.json(422, err);
}

function getAddToArrayQuery(arrayPath, value) {
  return _.set({}, '$addToSet.' + arrayPath, value)
}

function getRemoveFromArrayQuery(arrayPath, value) {
  return _.set({}, '$pull.' + arrayPath, value)
}
