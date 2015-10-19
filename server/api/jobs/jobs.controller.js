'use strict';

var _ = require('lodash');
var Jobs = require('./jobs.model');
var User = require('../user/user.model');

// Get list of jobss
exports.index = function (req, res) {
  Jobs.find().populate('employer').exec(function (err, jobs) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(jobs);
  });
};

// Get a single jobs
exports.show = function (req, res) {
  Jobs.findById(req.params.id, function (err, jobs) {
    if (err) {
      return handleError(res, err);
    }
    if (!jobs) {
      return res.status(404).send('Not Found');
    }
    return res.json(jobs);
  });
};

// Creates a new jobs in the DB.
exports.create = function (req, res) {
  Jobs.create(req.body, function (err, jobs) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(jobs);
  });
};

// Updates an existing jobs in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Jobs.findById(req.params.id, function (err, jobs) {
    if (err) {
      return handleError(res, err);
    }
    if (!jobs) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(jobs, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(jobs);
    });
  });
};

// Deletes a jobs from the DB.
exports.destroy = function (req, res) {
  Jobs.findById(req.params.id, function (err, jobs) {
    if (err) {
      return handleError(res, err);
    }
    if (!jobs) {
      return res.status(404).send('Not Found');
    }
    jobs.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

exports.markJobAsUsersFavourite = function(req, res){
  var favouriteJob = req.body.favouriteJob;
  if(!favouriteJob){
    return res.status(404).send('No favourite job attached');
  }
  User.findById(req.body.user._id, function(err, user) {
    if (err || !user) {
      return handleError(res, err);
    }
    var jobsWithoutCurrentlyAdded = _.reject(user.favouriteJobs, function(alreadyAddedJob){
      return JSON.stringify(alreadyAddedJob) === JSON.stringify(favouriteJob._id);
    });
    if(jobsWithoutCurrentlyAdded.length < user.favouriteJobs.length) {
      user.favouriteJobs = jobsWithoutCurrentlyAdded;
    }
    else {
      user.favouriteJobs.push(favouriteJob._id);
    }
    user.save(function (error) {
      if (error) {
        return res.status(500).send("update error", error);
      }
      user.populate('favouriteJobs', function(error, updatedUser){
        if (error) {
          return res.status(500).send("populating error", error);
        }
        return res.status(200).send(updatedUser.favouriteJobs);
      });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
