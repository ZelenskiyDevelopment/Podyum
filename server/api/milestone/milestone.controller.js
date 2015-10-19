'use strict';

var _ = require('lodash');
var Milestone = require('./milestone.model');
var User = require('../user/user.model');
var Q = require('q');

// Get list of milestones
exports.index = function(req, res) {
  Milestone.find(function (err, milestones) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(milestones);
  });
};

exports.getOwn = function(req, res){
  getMilestones(req.query.creator).then(function(milestones){
    return res.status(200).json(milestones);
  }).catch(function(err){
    return handleError(res, err);
  });
};

// Get a single milestone
exports.show = function(req, res) {
  Milestone.findById(req.params.id, function (err, milestone) {
    if(err) { return handleError(res, err); }
    if(!milestone) { return res.status(404).send('Not Found'); }
    return res.json(milestone);
  });
};

// Creates a new milestone in the DB.
exports.create = function(req, res) {
  Milestone.create(req.body, function(err, milestone) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(milestone);
  });
};

// Updates an existing milestone in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Milestone.findById(req.params.id, function (err, milestone) {
    if (err) { return handleError(res, err); }
    if(!milestone) { return res.status(404).send('Not Found'); }
    var updated = _.merge(milestone, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(milestone);
    });
  });
};

// Deletes a milestone from the DB.
exports.destroy = function(req, res) {
  Milestone.findById(req.params.id, function (err, milestone) {
    if(err) { return handleError(res, err); }
    if(!milestone) { return res.status(404).send('Not Found'); }
    milestone.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function getMilestones(user) {
  var userMilestones = [];
  var deffered = Q.defer();
  var promiesesArray = [];
  Milestone.find({creator: user}, function(err, milestones){
    if(err) console.log(err);
    userMilestones = _.union(userMilestones, milestones);
  });

  User.findById(user, function(err, user){
    if(err) deffered.reject(err);
    if(user.kind === 'player') {
      _.each(user.assignedTo, function (assignTo) {
        var propagatedMilestones = Q.defer();
        promiesesArray.push(propagatedMilestones.promise);
        Milestone.find({creator: assignTo.user}, function(err, milestones){
          if(err) deffered.reject(err);
          propagatedMilestones.resolve(milestones);
        });
      });
      Q.all(promiesesArray).then(function(milestonesArray){
        _.each(milestonesArray, function(milestones){
          userMilestones = _.union(milestones, userMilestones);
        });
        deffered.resolve(userMilestones);
      });
    }
    else{
      deffered.resolve(userMilestones);
    }
  });
  return deffered.promise;
}