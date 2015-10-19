'use strict';

var Q = require('q');
var _ = require('lodash');

exports.addObjectToDB = function (Model, object) {
  var defered = Q.defer(),
    model = new Model(object);
  model.save(function (err, savedObject) {
    if (err) {
      defered.reject(err);
    } else {
      defered.resolve(savedObject);
    }
  });
  return defered.promise;
};

exports.dropCollections = function (Models) {
  return Q.all(_.map(Models, function (model) {
    var defered = Q.defer();
    model.remove().exec().then(function () {
      defered.resolve();
    });
    return defered.promise;
  }));
};
