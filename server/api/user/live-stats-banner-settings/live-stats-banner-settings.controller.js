var _ = require('lodash'),
  User = require('./../user.model'),
  Q = require('q');

exports.getSettings = function (req, res) {
  var userId = req.user._id;

  User.findByIdQ(userId, '-salt -hashedPassword')
    .then(function (result) {
      return res.json(result.settings);
    }).catch(function (err) {
      return handleError(err);
    });
};

exports.postSettings = function (req, res) {
  var userId = req.user._id,
    query = {
      $set: {
        settings: req.body
      }
    };
  User.findOneAndUpdateQ({_id: userId}, query, {new: true})
    .then(function(result) {
      return res.json(201, result.settings);
    }).catch(function (err) {
      return handleError(res, err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
