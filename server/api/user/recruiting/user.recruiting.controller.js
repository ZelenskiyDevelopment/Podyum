var _ = require('lodash'),
  User = require('./../user.model'),
  Q = require('q'),
  PopulateUtils = require('../../../components/utils/PopulateUtils');

var DistinctCommand = Q.nbind(User.collection.distinct, User.collection);
var UserFind = Q.nbind(User.find, User);

exports.getAllowValues = function (req, res) {
  var body = req.body; 
  var match = body.match;

  DistinctCommand(body.field, match).then(function(result) {
    res.json(result);
  });
};

var getProjection = function(kind) {
  var projection =  {
    profilePhoto: 1,
  };
  projection.kind = 1;
  projection[kind] = 1;

  return projection;
};
var PAGE_SIZE = 10;
exports.find = function(req, res) {
  var body = req.body;
  var filtering = {};
  
  var pagination = body.pagination;
  var page = pagination.page | 0;
  var pageSize = pagination.pageSize | PAGE_SIZE; 

  if(body.kind === 'Athlete') {
    filtering.kind = 'player';
  } else {
    filtering.kind = body.kind.toLowerCase();
  }
  
  if(body.age.min === body.age.max) {
    filtering[filtering.kind + '.age'] = body.age;
  } else {
    filtering[filtering.kind + '.age'] = {
      $gte: body.age.min, 
      $lte: body.age.max
    };
  }

  if(!_.isEmpty(body.experience)) {
    filtering[filtering.kind + '.experience'] = {$in: body.experience};
  }
  if(!_.isEmpty(body.position)) {
    filtering[filtering.kind + '.position'] = {$in: body.position};
  }
  
  UserFind(filtering, getProjection(filtering.kind), {
    skip: page * pageSize,
    limit: pageSize
  }).then(function(result) {
    res.json(result);
  });
};
