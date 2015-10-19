var _ = require('lodash'),
  User = require('../user.model'),
  Q = require('q'),
  socket = require('../../../config/socketio.js')();

exports.noteTracking = function (req, res) {
  var trackingUser = req.body.trackingUser;
  var trackedUser = req.body.trackedUser;
  if(!trackedUser || !trackedUser._id){
    return res.status(404).send('Tracked user id not provided');
  }
  var newTrackByRecord = {user: trackingUser._id, date: Date.now().toString()};
  User.findById(trackedUser._id, function(err, user) {
    if (err || !user) {
      return handleError(res, err);
    }
    user.trackedBy.push(newTrackByRecord);
    user.save(function (error) {
      if (error) {
        return res.status(500).send("tracking update error", error);
      }
      return res.status(200).send(user);
    });
  });

};

function handleError(res, err) {
  return res.status(500).send(err);
}
