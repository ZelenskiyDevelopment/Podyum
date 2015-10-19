'use strict';
var User = require('./../user.model');
var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

/**
 * Add comment to photo of user
 * */
exports.addComment = function(req, res){
    var targetUserId = req.params.targetUserId;
    var targetPhoto = req.params.targetPhoto;
    console.log(targetPhoto);
    var comment = req.body.comment;
    var author = req.body.author;
    User.findById(targetUserId, function(err, user){
        var userPhoto = _.find(user.photos, function(photo){
            return photo._id == targetPhoto;
        });
        User.findById(author, function(err, author){
            var firstName, lastName;
            if(author.kind == 'player'){
                firstName = author.player.firstName;
                lastName = author.player.lastName;
            }
            else if(author.kind == 'coach'){
                firstName = author.coach.firstName;
                lastName = author.coach.lastName;
            }
            else{
                firstName = 'unknown';
                lastName = 'unknown';
            }
            userPhoto.comments.push({
                author: author,
                authorFirstName:firstName,
                authorLastName: lastName,
                authorProfilePhoto: author.profilePhoto,
                content: comment
            });
            user.save(function(err){
                if(err){
                    res.send(400);
                }
                    res.json({photos: userPhoto.comments});
            });
        });
    });
};

exports.addMedal = function (req, res){
    var targetUserId = req.params.targetUserId;
    var targetPhoto = req.params.targetPhoto;
    var medal = req.user._id;
    User.findById(targetUserId, function(err, user) {
        if(err) res.send(400);
        var userPhoto = _.find(user.photos, function (photo) {
            return photo._id == targetPhoto;
        });
        User.findById(medal, function(err, medalAuthor){
            if(err) res.send(400);
            var firstName, lastName;
            if(medalAuthor.kind == 'player'){
                firstName = medalAuthor.player.firstName;
                lastName = medalAuthor.player.lastName;
            }
            else if(medalAuthor.kind == 'coach'){
                firstName = medalAuthor.coach.firstName;
                lastName = medalAuthor.coach.lastName;
            }
            else{
                firstName = 'unknown';
                lastName = 'unknown';
            }
            userPhoto.medals.push(
                {
                    author: medalAuthor._id,
                    authorProfilePhoto: medalAuthor.profilePhoto,
                    authorFirstName:firstName,
                    authorLastName:lastName
                }
            );
            var userMedals = userPhoto.medals;
            user.save(function(err){
                if(err) res.send(400);
                res.json({medals: userMedals});
            });
        });
    });
};

exports.getPhoto = function (req, res) {
  var targetUserId = req.params.targetUserId;
  var targetPhoto = req.params.targetPhoto;
  User.findById(targetUserId, function(err, user) {
    if(err) res.send(400);
    var userPhoto = _.find(user.photos, function (photo) {
      return photo._id == targetPhoto;
    });
    res.send(userPhoto);
  });
};

exports.destroy = function(req, res){
    var targetUserId = req.params.targetUserId;
    var targetPhoto = req.params.targetPhoto;
    /*Give it a change*/
    console.log(req.user);
    User.findById(targetUserId, function(err, user){
        _.remove(user.photos, function(photo){
            return photo.photo == targetPhoto;
        });
        user.save(function(err, user){
           if(err) res.send(400);
            res.send(200);
        });
    });
};