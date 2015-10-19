var _ = require('lodash'),
  User = require('../user.model'),
  Q = require('q'),
  socket = require('../../../config/socketio.js')();


exports.assign = function (req, res, next) {
  var userId = req.user._id;
  var destUserId = req.body.data.id;
  User.findById(userId, function (err1, user) {
    User.findById(destUserId, function (err, destUser) {
      var request = {
        user: user,
        dateFrom: req.body.data.dtFrom,
        dateTo: req.body.data.dtTo,
        position: req.body.data.position,
        isPresent: req.body.data.isPresent ? true : false
      };
      destUser.assignRequests.push(request);
      var mappedRequest = {
        firstName: user[user.kind].firstName,
        lastName: user[user.kind].lastName,
        profilePhoto: user.profilePhoto,
        dateFrom: request.dateFrom,
        dateTo: request.dateTo,
        isPresent: request.isPresent,
        position: request.position,
        _id: user._id
      };
      socket.directMessage(destUserId, 'assignRequest', mappedRequest);
      destUser.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    });
  });
};

exports.acceptAssignRequest = function (req, res, next) {
  var userId = req.user._id;
  var sourceId = req.body.data._id;
  var request = req.body.data;

  User.findById(userId, function (err, user) {
    User.findById(sourceId, function (err, srcUser) {
      var ars = user.toObject().assignRequests;
      _.remove(ars, function (ar) {
        return ar.user.toString() === request._id.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(request.dateFrom || 0).toString() &&
          ar.position === request.position &&
          new Date(ar.dateTo || 0).toString() === new Date(request.dateTo || 0).toString();
      });

      user.assignRequests = ars;

      user.assigned.push({
        user: srcUser,
        dateFrom: new Date(request.dateFrom),
        dateTo: new Date(request.dateTo),
        position: request.position,
        isPresent: request.isPresent ? true : false
      });

      srcUser.assignedTo.push({
        user: user,
        dateTo: new Date(request.dateTo),
        dateFrom: new Date(request.dateFrom),
        position: request.position,
        isPresent: request.isPresent ? true : false
      });
      var newNotification = {
        kind: "assignAccepted",
        data: {_id: user._id, name: user[user.kind].name, profilePhoto: user.profilePhoto}
      };
      srcUser.newNotification.push(newNotification);
      socket.directMessage(sourceId, 'notification', newNotification);

      user.save(function (err1) {
        srcUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};


exports.rejectAssignRequest = function (req, res, next) {
  var userId = req.user._id;
  var sourceId = req.body.data._id;
  var request = req.body.data;
  User.findById(userId, function (err, user) {
    User.findById(sourceId, function (err, srcUser) {
      request.user = srcUser;
      var ars = user.toObject().assignRequests;
      _.remove(ars, function (ar) {
        return ar.user.toString() === request._id.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(request.dateFrom || 0).toString() &&
          ar.position === request.position &&
          new Date(ar.dateTo || 0).toString() === new Date(request.dateTo || 0).toString();
      });
      user.assignRequests = ars;

      user.save(function (err1) {
        if (err1) return validationError(res, err);
        res.send(200);
      });
    });
  });
};

exports.leave = function (req, res, next) {
  var userId = req.body.idChild;
  var destUserId = req.body.idParent;
  User.findById(userId, function (err, user) {
    User.findById(destUserId, function (err, destUser) {
      var ars = destUser.toObject().assigned;
      _.remove(ars, function (ar) {
        return ar.user.toString() === destUserId.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(req.body.dateFrom || 0).toString() &&
          ar.position === req.body.position &&
          new Date(ar.dateTo || 0).toString() === new Date(req.body.dateTo || 0).toString() &&
          ar.isPresent === req.body.isPresent;
      });
      var ars1 = user.toObject().assignedTo;
      _.remove(ars1, function (ar) {
        return ar.user.toString() === destUserId.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(req.body.dateFrom || 0).toString() &&
          ar.position === req.body.position && new Date(ar.dateTo || 0).toString() === new Date(req.body.dateTo || 0).toString() &&
          ar.isPresent === req.body.isPresent;
      });

      destUser.assigned = ars;
      user.assignedTo = ars1;
      if (req.body.isPresent) {
        var currentDate = new Date();
        destUser.assigned.push({
          user: userId,
          dateFrom: req.body.dateFrom,
          dateTo: currentDate,
          position: req.body.position,
          isPresent: false
        });
        user.assignedTo.push({
          user: destUserId,
          dateFrom: req.body.dateFrom,
          dateTo: currentDate,
          position: req.body.position,
          isPresent: false
        });
      }
      user.save(function (err1) {
        destUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.addToTeam = function (req, res, next) {
  var userId = req.user._id;
  var destUserId = req.body.data.id;
  User.findById(userId, function (err1, user) {
    User.findById(destUserId, function (err, destUser) {
      var request = {
        user: user,
        dateFrom: req.body.data.dtFrom,
        isPresent: true
      };
      destUser.assignRequests.push(request);
      var mappedRequest = {
        name: user[user.kind].name,
        profilePhoto: user.profilePhoto,
        dateFrom: request.dateFrom,
        isPresent: true,
        _id: user._id
      };
      socket.directMessage(destUserId, 'assignRequest', mappedRequest);
      destUser.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    });
  });
};

exports.addToTeamAsAdmin = function (req, res, next) {
  var userId = req.user._id;
  var destUserId = req.body.data.id;
  var teamId = req.body.data.teamId;
  User.findById(userId, function (err1, user) {
    User.findById(destUserId, function (err, destUser) {
        User.findOneQ({_id:teamId, rosterAdmins:userId}).then(function (results) {
          if(results) {
            var request = {
              user: results,
              dateFrom: req.body.data.dtFrom,
              isPresent: true
            };
            destUser.assignRequests.push(request);
            var mappedRequest = {
              name: user[user.kind].name,
              profilePhoto: user.profilePhoto,
              dateFrom: request.dateFrom,
              isPresent: true,
              _id: user._id
            };
            socket.directMessage(destUserId, 'assignRequest', mappedRequest);
            destUser.save(function (err) {
              if (err) return validationError(res, err);
              res.send(200);
            });
          }
          else {
            res.send(401);
          }
      });
    });
  });
};

exports.acceptRecruitRequest = function (req, res, next) {
  var userId = req.user._id;
  var sourceId = req.body.data._id;
  var request = req.body.data;

  User.findById(userId, function (err, user) {
    User.findById(sourceId, function (err, srcUser) {
      var ars = user.toObject().assignRequests;
      _.remove(ars, function (ar) {
        return ar.user.toString() === request._id.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(request.dateFrom || 0).toString() &&
          ar.isPresent === request.isPresent;
      });

      user.assignRequests = ars;

      user.assignedTo.push({
        user: srcUser,
        dateFrom: new Date(request.dateFrom),
        isPresent: request.isPresent ? true : false
      });

      srcUser.assigned.push({
        user: user,
        dateFrom: new Date(request.dateFrom),
        isPresent: request.isPresent ? true : false
      });
      var newNotification = {
        kind: "recruitAccepted",
        data: {_id: user._id, firstName: user[user.kind].firstName,lastName: user[user.kind].lastName, profilePhoto: user.profilePhoto}
      };
      srcUser.newNotification.push(newNotification);
      socket.directMessage(sourceId, 'notification', newNotification);

      user.save(function (err1) {
        srcUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};

exports.rejectRecruitRequest = function (req, res, next) {
  var userId = req.user._id;
  var sourceId = req.body.data._id;
  var request = req.body.data;
  User.findById(userId, function (err, user) {
    User.findById(sourceId, function (err, srcUser) {
      request.user = srcUser;
      var ars = user.toObject().assignRequests;
      _.remove(ars, function (ar) {
        return ar.user.toString() === request._id.toString() &&
          new Date(ar.dateFrom || 0).toString() === new Date(request.dateFrom || 0).toString() &&
          ar.isPresent === request.isPresent;
      });
      user.assignRequests = ars;

      user.save(function (err1) {
        if (err1) return validationError(res, err);
        res.send(200);
      });
    });
  });
};

exports.removeFromTeam = function (req, res, next) {
  var userId = req.body.idChild;
  var destUserId = req.body.idParent;
  User.findById(userId, function (err, user) {
    User.findById(destUserId, function (err, destUser) {
      var ars = user.toObject().assigned;
      var removed = _.remove(ars, function (ar) {
        return ar.user.toString() === destUserId.toString() &&
          ar.isPresent === req.body.isPresent;
      });
      var ars1 = destUser.toObject().assignedTo;
      var removed1 = _.remove(ars1, function (ar) {
        return ar.user.toString() === userId.toString() &&
          ar.isPresent === req.body.isPresent;
      });

      user.assigned = ars;
      destUser.assignedTo = ars1;
      if (req.body.isPresent) {
        var currentDate = new Date();
        user.assigned.push({
          user: destUserId,
          dateFrom: removed[0].dateFrom,
          dateTo: currentDate,
          isPresent: false
        });
        destUser.assignedTo.push({
          user: userId,
          dateFrom: removed1[0].dateFrom,
          dateTo: currentDate,
          isPresent: false
        });
      }
      user.save(function (err1) {
        destUser.save(function (err2) {
          if (err1 || err2) return validationError(res, err);
          res.send(200);
        });
      });
    });
  });
};


