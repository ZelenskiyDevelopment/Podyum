'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash'),
  PopulateUtils = require('../../components/utils/PopulateUtils'),
  RoomCtrl = require('../room/room.controller');


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  var query = _.omit(req.query, _.isEmpty),
    options = PopulateUtils.userPopulateOptions('friends');
  User.find(query, '-salt -hashedPassword')
    .populate(options)
    .exec(function (err, users) {
      if (err) return res.send(500, err);
      res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'premium';
  newUser.save(function (err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
    res.json({token: token,id_user:user._id});
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id,
    friendsOptions = PopulateUtils.userPopulateOptions('friends'),
    assignedOptions = PopulateUtils.userPopulateOptions('assigned.user');

  User.findById(userId, '-salt -hashedPassword')
    .populate(assignedOptions)
    .populate(friendsOptions)
    .populate('photos')
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id,
    options = PopulateUtils.userPopulateOptions('friends'),
    optionsAssigned = PopulateUtils.userPopulateOptions('assigned.user'),
    optionsNotificationMessages = PopulateUtils.userPopulateOptions('messages.sender'),
    optionsMyFollowers = PopulateUtils.userPopulateOptions('followed'),
    optionsTrackedBy = PopulateUtils.userPopulateOptions('trackedBy.user');

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword')
    .populate(options)
    .populate(optionsAssigned)
    .populate(optionsNotificationMessages)
    .populate(optionsMyFollowers)
    .populate('photos')
    .populate('favouriteJobs')
    .populate(optionsTrackedBy)
    .exec(function (err, user) { // don't ever give out the password or salt
      if (err) return next(err);
      if (!user) return res.json(401);
      res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};


exports.changeMembership = function(req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    user.role = req.body.data;
    user.save(function (err) {
      if(err) return validationError(res, err);
      res.send(200)
    })
  });
};

exports.completeData = function (req, res, next) {
  var userId = req.user._id;
  var userData = req.body;
  User.findById(userId, function (err, user) {
    user.sport = userData.sport;
    user.completed = true;
    user.kind = userData.kind;
    user.events = userData.events;
    user[user.kind] = userData[user.kind];
    user.save(function (err) {
      if (err) return validationError(res, err);
      if(user.kind === 'team'){
        RoomCtrl.createRoom(userId, 'Players', []);
        RoomCtrl.createRoom(userId, 'Coaches', []);
      }
      res.send(200);
    });
  });
};

exports.updateProfile = function(req,res) {

    var id = req.body.id;
     var data = req.body.data;
    User.update({_id: id}, {$set:data}, {}, function (err) {
       if (err) return validationError(res, err);
       res.send(200);
    });
}

exports.updateStats = function (req, res, next) {
  var userData = req.body.stats;
  var userId = req.body.id;
  User.update({_id: userId}, {$set: {"player.stats": userData}}, {}, function (err) {
    if (err) return validationError(res, err);
    res.send(200);
  });
};

exports.search = function (req, res, next) {
  var limit = req.query.limit || 5;
  var skip = req.query.skip || 0;
  var patterns = req.query.pattern.split(' ');
  var regexps = _.map(patterns, function (pattern) {
    return new RegExp('^.*' + pattern + '.*$', "i");
  });
  User.find({
    $or: [
      {
        "player.firstName": {$in: regexps}
      }, {
        "player.lastName": {$in: regexps}
      }, {
        "coach.firstName": {$in: regexps}
      }, {
        "coach.lastName": {$in: regexps}
      }, {
        "fan.firstName": {$in: regexps}
      }, {
        "fan.lastName": {$in: regexps}
      }, {
        "team.name": {$in: regexps}
      }, {
        "league.name": {$in: regexps}
      }
    ]
  },'kind player team league fan coach profilePhoto _id')
    .skip(skip)
    .limit(limit)
    .exec(function (err, users) {
      if (err) return validationError(res, err);
      res.json(users);
    });
};

exports.getAllTeams = function (req, res, next) {
  var userId = req.params.id;
  User.find({
    kind: 'team'
  }, '-salt -hashedPassword').execQ().then(function (users) {
    return res.json(200, users);
  }).catch(function (err) {
    return handleError(res, err);
  });
};

exports.getAllLeagues = function (req, res, next) {
  var userId = req.params.id;
  User.find({
    kind: 'league'
  }, '-salt -hashedPassword').execQ().then(function (users) {
    return res.json(200, users);
  }).catch(function (err) {
    return handleError(res, err);
  });
};

exports.getAllHumanUsers = function (req, res, next) {
  User.find({
    kind: {$in:['player', 'coach', 'fan']}
  }, '-salt -hashedPassword').execQ().then(function (users) {
    return res.json(200, users);
  }).catch(function (err) {
    return handleError(res, err);
  });
};

function validationError(res, err) {
  return res.json(422, err);
}
