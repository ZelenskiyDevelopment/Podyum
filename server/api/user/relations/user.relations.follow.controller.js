var _ = require('lodash'),
  User = require('../user.model'),
  Q = require('q');
socket = require('../../../config/socketio.js')();

exports.followUser = function (req, res) {

  var user = req.user,
    userId = req.user._id,
    destUserId = req.body.id;

  var newNotification = {
    kind: "followedBy",
    data: {
      _id: userId,
      name: user[user.kind].name,
      firstName: user[user.kind].firstName,
      lastName: user[user.kind].lastName,
      profilePhoto: user.profilePhoto
    }
  };
  var findQuery = {
      _id: destUserId,
      follows: userId
    }, userUpdateQuery = getAddToArrayQuery('follows', destUserId),
    dstUserUpdateQuery = getAddToArrayQuery('followed', userId),
    response = {friends: 0};
    dstUserUpdateQuery = getAddToArrayQuery('newNotification', newNotification, dstUserUpdateQuery);

  var promises = User.findQ(findQuery, {_id: 1}).then(function (result) {
    if (result.length > 0) {
      dstUserUpdateQuery.$addToSet.friends = userId;
      userUpdateQuery.$addToSet.friends = destUserId;
      response.friends = 1;
    }
    return [
      User.updateQ({_id: userId}, userUpdateQuery, {}),
      User.updateQ({_id: destUserId}, dstUserUpdateQuery, {})
    ];
  });

  Q.all(promises).then(function () {
    socket.directMessage(destUserId, 'notification', newNotification);
    return res.json(response);
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

exports.unFollowUser = function (req, res) {
  var userId = req.user._id,
    dstUserId = req.body.id,
    srcUserQuery = getRemoveFromArrayQuery('follows', dstUserId),
    dstUserQuery = getRemoveFromArrayQuery('followed', userId),
    promises = [
      User.updateQ({_id: userId}, srcUserQuery, {}),
      User.updateQ({_id: dstUserId}, dstUserQuery, {})
    ];

  Q.all(promises).then(function () {
    return res.send(200);
  }).catch(function (errs) {
    return validationError(res, errs);
  });
};

function getAddToArrayQuery(arrayPath, value, object) {
  object = object || {};
  return _.set(object, '$addToSet.' + arrayPath, value)
}

function getRemoveFromArrayQuery(arrayPath, value) {
  return _.set({}, '$pull.' + arrayPath, value)
}

function validationError(res, err) {
  return res.json(422, err);
}
