'use strict';

var Team = require('./team.model'),

    assignedToTeam = require('./assignedToTeam.model'),

    assignedToLeague = require('../league/assignedToLeague.model');

    socket = require('../../config/socketio.js')();

var mongo = require('mongodb');

exports.addTeam = function(req, res) {

    var data = req.body;

    console.log(data);
    var newTeam = new Team(data);

    newTeam.save(function(err, team){
        if (err) throw err;

        team.myLeagues.forEach(function(item){
            var leagueAssigned = new assignedToLeague({
                id_team: team._id,
                id_league: item.user,
                dateFrom: new Date(),
                isPresent: true
            });
            leagueAssigned.save(function(err, assign){

            });
        });
        res.send(200,team);
    });
};


exports.updateTeam = function(req, res) {

    var data = req.body,

        id = data._id;

    delete data._id;
    delete data.__v;

    console.log(id);
    Team.update({_id: id}, {$set: data}, {}, function(err){
        if (err) return validationError(res, err);

        res.send(200);
    });

};

exports.acceptAssignRequest = function(req, res) {
    var id = req.params.id;
    var data = {
        accepted: true,
        rejected: false
    };
    assignedToTeam.update({_id: id}, {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        res.send(200);
    });
};

exports.rejectAssignRequest = function(req, res) {
    var id = req.params.id;
    var data = {
        rejected: true,
        accepted: false
    };
    assignedToTeam.update({_id: id}, {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        res.send(200);
    });
};

exports.addToTeam = function(req, res) {

    var  data  = req.body;

    var addToTeam  = new assignedToTeam(data);

    addToTeam.save(function(err){
        Team.findById(data.id_team, function (err, fromUser) {

            socket.directMessage(data.id_user, 'assignRequest', fromUser);

        });

    });
};

exports.removePlayer = function(req, res) {

    var id = req.params.id;
    var data = {
        rejected: true,
        accepted: false,
        dateTo: new Date(),
        isPresent: false
    };
    assignedToTeam.update({_id: id}, {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        res.send(200);
    });
};

exports.getPlayersByTeam = function(req, res) {

    var id = req.params.id;

    assignedToTeam
    .find({id_team: id})
    .populate('id_user')
    .populate('id_team')
    .execQ().then(function (playes) {

       return res.json(200, playes);
    }).catch(function (err) {
        return handleError(res, err);
    });

};

exports.getAssignRequestsToTeam = function(req, res) {
    var teamId = req.params.id;

    assignedToTeam.find({
        id_team: teamId
    }).execQ().then(function (request) {
        if (request.length == 0) {
            return res.json(422,response);
        }
        return res.json(200, request);

    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.getAssignRequests = function(req, res) {
    var userId = req.params.id;
    var response = [];
    assignedToTeam.find({
        id_user: userId
    }).execQ().then(function (request) {
        if (request.length == 0) {
            return res.json(422,response);
        }

        return res.json(200, request);

    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.sendRequestToTeam = function(req, res) {

    var request = req.body;

    var data = {
        accepted: false,
        requestToTeam: true,
        rejected: false,
        isPresent: true,
        dateFrom: new Date(),
        id_user: request.id_user,
        id_team: request.id_team
    };


    var addToTeam  = new assignedToTeam(data);

    addToTeam.save(function(err, request){

        return res.json(200, request);

    });

};

exports.getTeam = function(req, res) {
    var userId = req.params.id;
    Team
    .find({ id_user: userId})
    .populate('myLeagues.user')
    .execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
}

exports.getTeamById  = function(req, res) {
    var Id = req.params.id;
    var findId = new mongo.ObjectID(Id);
    Team.find({
        _id: findId
    }).execQ().then(function(task) {
        return res.json(200, task);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.getAllTeam = function(req, res) {
    Team.find().execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

function validationError(res, err) {
    return res.json(422, err);
}
