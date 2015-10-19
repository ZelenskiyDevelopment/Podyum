'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var User = require('../user/user.model'),
  PopulateUtils = require('../../components/utils/PopulateUtils');


// Get list of games
exports.index = function (req, res) {
  Game.find(function (err, games) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function (req, res) {
  var optionsTeam1 = PopulateUtils.userPopulateOptions('team1'),
    optionsTeam2 = PopulateUtils.userPopulateOptions('team2');
  Game.findById(req.params.id)
    .populate(optionsTeam1)
    .populate(optionsTeam2)
    .exec(function (err, game) {
      if (err) {
        return handleError(res, err);
      }
      if (!game) {
        return res.send(404);
      }
      return res.json(game);
    });
};

// Creates a new game in the DB.
exports.create = function (req, res) {
  var request = req.body;
  if (request.league === 'all') {
    request.league = undefined;
  }
  request.data = {};

  Game.create(req.body, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send(404);
    }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send(404);
    }
    game.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.getGamesWithId = function (req, res) {
  var id = req.params.id,
    optionsTeam1 = PopulateUtils.userPopulateOptions('team1'),
    optionsTeam2 = PopulateUtils.userPopulateOptions('team2');
  Game.find({$or: [{'league': id}, {'team1': id}, {'team2': id}]})
    .populate(optionsTeam1)
    .populate(optionsTeam2)
    .exec(function (err, games) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, games);
    });
};

exports.postData = function (req, res) {
  Game.findById(req.body.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send(404);
    }
    var gameId = req.body.id;
    var gameData = req.body.data;
    Game.update({_id: gameId}, {$set: {"data": gameData}}, {}, function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, game);
    });
  });
};

exports.postUserData = function (req, res) {

  var gameId = req.body.id;
  var userData = req.body.data;

  Game.update({_id: gameId}, {$set: {"userData": userData}}, {}, function (err) {
    if (err) return validationError(res, err);
    res.send(200);
  });

};

exports.postLastIn = function (req, res) {

  var gameId = req.body.id;
  var lastIn = req.body.data;

  Game.update({_id: gameId}, {$set: {"lastIn": lastIn}}, {}, function (err) {
    if (err) return validationError(res, err);
    res.send(200);
  });

};

exports.getGamesForTeams = function (req, res) {
  var id = req.params.id,
    optionsTeam1 = PopulateUtils.userPopulateOptions('team1'),
    optionsTeam2 = PopulateUtils.userPopulateOptions('team2');
  User.findById(id, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    var teams = _.filter(user.toObject().assignedTo, function (u) {
      return u.isPresent;
    });

    teams = _.map(teams, function (team) {
      return team.user;
    });
    Game.find({$or: [{'team1': {$in: teams}}, {'team2': {$in: teams}}]})
      .populate(optionsTeam1)
      .populate(optionsTeam2)
      .exec(function (err, games) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, games);
      });
  });
};

exports.getAllGames = function (req, res) {
  var user = req.user,
    usersInRelation = getInterestedUserIds(user, user.settings);

  var query = {
    kind: 'team',
    $or: [
      {_id: {$in: usersInRelation}},
      {'assigned': {$elemMatch: {user: {$in: usersInRelation}, isPresent:true}}},
      {'assignedTo': {$elemMatch: {user: {$in: usersInRelation}, isPresent:true}}}
    ]
  };

  var teamsPromise = User.findQ(query);
  var teamIds;
  teamsPromise.then(function (teams) {
    teamIds = _.map(teams, '_id');
    return User.findQ({kind: 'league', 'assigned.user': {$in: teamIds}});
  }).then(function (leagues) {
    return _.flatten([_.map(leagues, '_id'), teamIds]);
  }).then(function (ids) {
    var optionsTeam1 = PopulateUtils.userPopulateOptions('team1'),
      optionsTeam2 = PopulateUtils.userPopulateOptions('team2'),
      optionsLeague = PopulateUtils.userPopulateOptions('league');
    return Game.find({$or: [{'league': {$in: ids}}, {'team1': {$in: ids}}, {'team2': {$in: ids}}]})
      .populate(optionsTeam1)
      .populate(optionsTeam2)
      .populate(optionsLeague)
      .execQ();
  }).then(function (result) {
    return res.json(result);
  }).catch(function (err) {
    return handleError(res, err);
  });
};

function getInterestedUserIds(user, settings) {
  settings = settings || {};

  var usersArray = [[user._id], _.map(user.assignedTo, 'user')];
  if(settings.myGames){
    return usersArray;
  }

  if(settings.myFriendsGames){
    usersArray.push(user.friends);
  }

  if(settings.myFollowsGames) {
    usersArray.push(user.follows);
  }

  return _.flatten(usersArray);
}

function handleError(res, err) {
  return res.send(500, err);
}

function validationError(res, err) {
  return res.json(422, err);
}
