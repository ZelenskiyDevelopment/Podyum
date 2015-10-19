'use strict';

var _ = require('lodash');
var Photo = require('./photo.model');
var User = require('../user/user.model');
var Comment = require('../comment/comment.model');
var Event = require('../event/event.model');
var Q = require('q');
var PopulateUtils = require('../../components/utils/PopulateUtils');
var optionsPhoto = PopulateUtils.userPopulateOptions('comments');
var optionsPhotoMedals = PopulateUtils.userPopulateOptions('medals');

// Get list of photos
exports.index = function(req, res) {
  Photo.find(function (err, photos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(photos);
  });
};

// Get a single photo
exports.show = function(req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if(err) { return handleError(res, err); }
    if(!photo) { return res.status(404).send('Not Found'); }
  }).populate(optionsPhoto)
    .populate(optionsPhotoMedals).exec(function(err, photo){
        Q.all(getPopulatedComments(photo))
            .then(function(comments){
              photo.comments = comments;
              return res.status(200).json(photo);
            });
  });
};

// Creates a new photo in the DB.
exports.create = function(req, res) {
  Photo.create(req.body, function(err, photo) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(photo);
  });
};

// Updates an existing photo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Photo.findById(req.params.id, function (err, photo) {
    if (err) { return handleError(res, err); }
    if(!photo) { return res.status(404).send('Not Found'); }
    var updated = _.merge(photo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(photo);
    });
  });
};

// Deletes a photo from the DB.
exports.destroy = function(req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if(err) { return handleError(res, err); }
    if(!photo) { return res.status(404).send('Not Found'); }
    photo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.addComment = function(req, res){
  Photo.findById(req.params.id, function(err, photo){
    if(err) { return handleError(res, err) ;}
    if(!photo) { return res.status(404).send('Not Found'); }
    var comment = req.body.comment;
    photo.comments.push(comment);
    if(!_.isUndefined(photo.event) && !_.isNull(photo.event)){
      console.log(photo.event);
      Event.findById(photo.event, function(err, event){
        event.comments.push(comment);
        event.save();
      });
    }
    photo.save(function (err, photo) {
      if (err) { return handleError(res, err); }
      Photo.findById(photo._id)
          .populate(optionsPhoto)
          .populate('comments')
          .exec(function(err, photo){
          if(err) return handleError(res, err);
          Q.all(getPopulatedComments(photo))
              .then(function(comments){
                return res.status(200).json(comments);
              });
          });
    });
  });
};

exports.addMedal = function(req, res){
  Photo.findById(req.params.id, function(err, photo){
    if(err) { return handleError(res, err) ;}
    if(!photo) { return res.status(404).send('Not Found'); }
    var medal = req.body.medal;
    photo.medals.push(medal);
    if(!_.isUndefined(photo.event) && !_.isNull(photo.event)){
      Event.findById(photo.event, function(err, event){
        event.medals.push(medal);
        event.save();
      });
    }
    photo.save(function (err, photo) {
      if (err) { return handleError(res, err); }

      Photo.findById(req.params.id)
          .populate(optionsPhotoMedals)
          .exec(function(err, photo){
            return res.status(200).json(photo.medals);
          });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function getPopulatedComments(photo){
  var promisesArray = [];
  _.each(photo.comments, function(comment){
    var populatePromise = Q.defer();
    promisesArray.push(populatePromise.promise);
    Comment.findById(comment._id, function(err, comment){

    }).populate(PopulateUtils.userPopulateOptions('author'))
      .exec(function(err, comment){
        populatePromise.resolve(comment);
      });
  });
  return promisesArray;
}