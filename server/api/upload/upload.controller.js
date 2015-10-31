'use strict';
var User = require('../user/user.model');
var Photo = require('../photo/photo.model');
var _ = require('lodash');
var mime = require('mime');
var multiparty = require('multiparty'),
  util = require('util'),
  randomstring = require('randomstring'),
  fs = require('fs');
var Q = require('q');

var PHOTO_DIR = __dirname + '/../../../client/photos/';

var readFile = Q.nbind(fs.readFile, fs);

var writeFile = function (path, data) {
  var defered = Q.defer();

  fs.writeFile(path, data, function (err) {
    if (err) {
      defered.reject(err);
    } else {
      defered.resolve();
    }
    return defered.promise;
  });
};

var parse = function(req){
  var defered = Q.defer();
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if(err){
      defered.reject(err);
    } else {
      defered.resolve(files);
    }
  });
  return defered.promise;
};

exports.uploadProfilePhoto = function (req, res) {
  uploadPhoto(req).then(function (result) {
    return User.updateQ({_id: req.user._id}, {$set: {profilePhoto: result.photo}}, {}).then(function () {
      return result;
    });
  }).then(function (result) {
    return res.json(result);
  }).catch(function (err) {
    return handleError(res, err)
  });

    console.log(PHOTO_DIR);
};

exports.upload = function(req, res) {
  uploadPhoto(req).then(function (result) {
    return res.json(result);
  }).catch(function (err) {
    return handleError(res, err)
  });
};

function uploadPhoto(req) {
  var userId = req.user._id;

  return parse(req).then(function(files) {
    var newName = randomstring.generate()+".png";
    var img = files.file[0];
    console.log(mime.lookup(img.path));
    var photo = {photo: newName, owner: userId, medals: [], comments: []};
    return readFile(img.path).then(function (data) {
      return writeFile(PHOTO_DIR + newName, data);
    }).then(function () {
      return Photo.createQ(photo);
    }).then(function (photo) {
      return User.updateQ({_id: userId}, {$push: {photos: photo}}, {}).then(function () {
        return photo;
      });
    });
  });
}

function handleError(res, err) {
  return res.send(500, err);
}

function validationError(res, err) {
  return res.json(422, err);
}
